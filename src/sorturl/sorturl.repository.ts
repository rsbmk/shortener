import { Injectable } from '@nestjs/common';

import { DB } from 'src/db/db.service';
import { CreateSortUrlRepo, SortUrlModel } from './entities/sorturl.entity';

@Injectable()
export class SortUrlRepository {
  constructor(private db: DB) {}

  async create({ slug, url, sortUrl, userId }: CreateSortUrlRepo) {
    await this.db.client
      .execute({
        sql: 'INSERT INTO sorturl (slug, url, sortUrl, userId) VALUES (:slug, :url, :sortUrl, :userId)',
        args: { slug, url, sortUrl, userId },
      })
      .catch((err) => {
        const message = this.db.ERROR_MESSAGE_BY_ERROR_CODE[err.code].message;
        throw new Error(message);
      });

    return this.findOneBySlug(slug);
  }

  async findOneBySlug(slug: string): Promise<SortUrlModel | undefined> {
    const res = await this.db.client.execute({
      sql: 'SELECT * FROM sorturl WHERE slug = :slug AND state = 1',
      args: { slug },
    });

    return res.rows[0] as unknown as SortUrlModel | undefined;
  }

  async updateVisits(id: number) {
    await this.db.client.execute({
      sql: 'UPDATE sorturl SET visits = visits + 1 WHERE id = :id',
      args: { id },
    });
  }

  async findOneById(id: bigint): Promise<SortUrlModel | undefined> {
    const res = await this.db.client.execute({
      sql: 'SELECT * FROM sorturl WHERE id = :id AND state = 1',
      args: { id },
    });

    return res.rows[0] as unknown as SortUrlModel | undefined;
  }
}
