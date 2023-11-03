import { BadRequestException, Injectable } from '@nestjs/common';

import { ONE_WEEK_IN_MILLISECONDS } from 'src/constanst';
import { CacheManager } from 'src/db';
import { UpdateSortUrlDto } from './dto';
import {
  CreateSortUrlService,
  CreateTemporalSortUrlService,
  SortUrlModel,
} from './entities/sorturl.entity';
import { SortUrlRepository } from './sorturl.repository';

@Injectable()
export class SorturlService {
  constructor(
    private sortUrlRepository: SortUrlRepository,
    private cacheManager: CacheManager,
  ) {}

  create({ url, name, userId }: CreateSortUrlService) {
    const { slug, sortUrl } = this.getSorUrl(name);

    return this.sortUrlRepository.create({ slug, url, sortUrl, userId }).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  async temporalCreate({ url, name }: CreateTemporalSortUrlService) {
    const { slug, sortUrl } = this.getSorUrl(name);
    await this.cacheManager.client.set(slug, url, { EX: ONE_WEEK_IN_MILLISECONDS });
    return { slug, url, sortUrl };
  }

  findAll(userId: number) {
    return this.sortUrlRepository.findAllByUser(userId);
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
