import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { Public } from './auth/auth.module';
import { ONE_WEEK_IN_SECONDS } from './constanst';
import { CacheManager } from './db';
import { SortUrlModel } from './sorturl/entities/sorturl.entity';
import { SorturlService } from './sorturl/sorturl.service';

@Controller()
export class AppController {
  constructor(
    private sorturlService: SorturlService,
    private cacheManager: CacheManager,
  ) {}

  @Public()
  @Get(':slug')
  async findOne(@Param('slug') slug: string, @Res() res: Response) {
    const [cacheKey] = await this.cacheManager.client.keys(`*:${slug}`);
    if (cacheKey) {
      const cachedUrl = await this.cacheManager.client.get(cacheKey);
      return res.redirect(cachedUrl);
    }

    let sorturl: SortUrlModel = undefined;

    try {
      sorturl = await this.sorturlService.findOneBySlug({ slug });
      await this.cacheManager.client.set(sorturl.slug, sorturl.url, {
        EX: ONE_WEEK_IN_SECONDS,
      });
    } catch (error) {
      console.error({ error });
    }

    if (sorturl) return res.redirect(sorturl.url);
    return res.send('404 - Not Found');
  }
}
