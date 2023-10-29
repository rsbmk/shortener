import { Injectable } from '@nestjs/common';

import { UpdateSortUrlDto } from './dto';
import { CreateSorturlService } from './entities/sorturl.entity';
import { SortUrlRepository } from './sorturl.repository';

@Injectable()
export class SorturlService {
  constructor(private sortUrlRepository: SortUrlRepository) {}

  create({ url, origin }: CreateSorturlService) {
    const slug = Math.random().toString(36).substring(2, 8);
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

  async findOneBySlug({ slug }: UpdateSortUrlDto) {
    const findedSort = await this.sortUrlRepository.findOneBySlug(slug);

    if (findedSort) {
      this.sortUrlRepository.updateVisits(findedSort.id);
      return {
        ...findedSort,
        visits: findedSort.visits + 1,
      };
    }

    console.log({ findedSort });
    return findedSort;
  }

  findOneById(id: number) {
    return this.sortUrlRepository.findOneById(BigInt(id));
  }

  remove(id: number) {
    return `This action removes a #${id} sorturl`;
  }
}
