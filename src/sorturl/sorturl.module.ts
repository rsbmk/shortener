import { Module } from '@nestjs/common';

import { CacheManager, DB } from 'src/db';
import { SorturlController } from './sorturl.controller';
import { SortUrlRepository } from './sorturl.repository';
import { SorturlService } from './sorturl.service';

@Module({
  controllers: [SorturlController],
  providers: [SorturlService, SortUrlRepository, DB, CacheManager],
  exports: [SorturlService, SortUrlRepository, DB, CacheManager],
})
export class SorturlModule {}
