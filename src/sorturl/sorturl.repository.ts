import { Injectable } from '@nestjs/common';

import { DB } from 'src/db/db.service';
import { CreateSortUrl, SortUrlModel } from './entities/sorturl.entity';

@Injectable()
export class SortUrlRepository {
  constructor(private db: DB) {}

  async create({ slug, url, sortUrl }: CreateSortUrl) {
    try {
      await this.db.client.execute({
        sql: 'INSERT INTO sorturl (slug, url, sortUrl) VALUES (:slug, :url, :sortUrl)',
        args: { slug, url, sortUrl },
      });
    } catch (error) {
      console.error('error create sorturl');
    }

    return this.findOneBySlug(slug);
  }

  async findOneBySlug(slug: string): Promise<SortUrlModel | undefined> {
    const res = await this.db.client.execute({
      sql: 'SELECT * FROM sorturl WHERE slug = :slug',
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
      sql: 'SELECT * FROM sorturl WHERE id = :id',
      args: { id },
    });

    return res.rows[0] as unknown as SortUrlModel | undefined;
  }
}
