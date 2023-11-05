import { BadRequestException, Injectable } from '@nestjs/common';

import { ONE_WEEK_IN_SECONDS } from 'src/constanst';
import { CacheManager } from 'src/db';
import { UpdateSortUrlDto } from './dto';
import { CreateSortUrlService, SaveUrlCache, SortUrlModel } from './entities/sorturl.entity';
import { SortUrlRepository } from './sorturl.repository';

@Injectable()
export class SorturlService {
  constructor(
    private sortUrlRepository: SortUrlRepository,
    private cacheManager: CacheManager,
  ) {}

  async create({ url, name, userId, options }: CreateSortUrlService) {
    const { temporal = false, ttl = ONE_WEEK_IN_SECONDS } = options || {};
    const { slug, sortUrl } = this.getSorUrl(name);

    if (temporal) {
      await this.saveSortUrlCache({ slug, url, userId, ttl: Number(ttl) });
      return { slug, url, sortUrl };
    }

    return this.sortUrlRepository.create({ slug, url, sortUrl, userId }).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  async temporalCreate({ url, name, userId, options }: CreateSortUrlService) {
    const { slug, sortUrl } = this.getSorUrl(name);
    const ttl = options?.ttl ? Number(options.ttl) : undefined;

    await this.saveSortUrlCache({ slug, url, userId, ttl });
    return { slug, url, sortUrl };
  }

  findAllByUser(userId: number) {
    return this.sortUrlRepository.findAllByUser(userId);
  }

  async findAllTemporalsByUser(userId: number) {
    const keys = await this.cacheManager.client.keys(`${userId}:*`);

    return Promise.all(
      keys.map(async (key) => {
        const url = await this.cacheManager.client.get(key);
        const slug = key.split(':')[1];

        return {
          slug,
          url,
          sortUrl: `${process.env.ORIGIN}/${slug}`,
        };
      }),
    );
  }

  async findOneBySlug({ slug }: UpdateSortUrlDto): Promise<SortUrlModel | undefined> {
    const findedSort = await this.sortUrlRepository.findOneBySlug(slug);
    if (!findedSort) return undefined;

    this.sortUrlRepository.updateVisits(findedSort.id);
    return {
      ...findedSort,
      visits: findedSort.visits + 1,
    };
  }

  findOneById(id: number) {
    return this.sortUrlRepository.findOneById(BigInt(id));
  }

  remove(id: number) {
    return `This action removes a #${id} sorturl`;
  }

  private async saveSortUrlCache({ slug, url, userId, ttl }: SaveUrlCache) {
    const defaultTtl = ttl ?? ONE_WEEK_IN_SECONDS;
    await this.cacheManager.client.set(`${userId}:${slug}`, url, { EX: defaultTtl });
  }

  private getSorUrl(name: string) {
    const origin = process.env.ORIGIN;
    let slug = Math.random().toString(36).substring(2, 8);

    if (name) slug = name;
    const sortUrl = `${origin}/${slug}`;

    return {
      slug,
      sortUrl,
    };
  }
}
