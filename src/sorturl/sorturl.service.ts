import { Injectable } from '@nestjs/common';

import { CreateSorturlDto, UpdateSortUrlDto } from './dto';
import { SortUrlModel } from './entities/sorturl.entity';
import { SortUrlRepository } from './sorturl.repository';

@Injectable()
export class SorturlService {
  constructor(private sortUrlRepository: SortUrlRepository) {}

  create({ url, name }: CreateSorturlDto) {
    const origin = process.env.ORIGIN;
    let slug = Math.random().toString(36).substring(2, 8);

    if (name) slug = name;
    const sortUrl = `${origin}/${slug}`;

    try {
      return this.sortUrlRepository.create({ slug, url, sortUrl });
    } catch (error) {
      console.log('cath service');
    }
    return 'Something went wrong';
  }

  findAll() {
    return `This action returns all sorturl`;
  }

  async findOneBySlug({
    slug,
  }: UpdateSortUrlDto): Promise<SortUrlModel | undefined> {
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
}
