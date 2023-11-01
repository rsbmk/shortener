import { Module } from '@nestjs/common';
import { DB } from 'src/db/db.service';
import { SorturlController } from './sorturl.controller';
import { SortUrlRepository } from './sorturl.repository';
import { SorturlService } from './sorturl.service';

@Module({
  controllers: [SorturlController],
  providers: [SorturlService, SortUrlRepository, DB],
  exports: [SorturlService, SortUrlRepository, DB],
})
export class SorturlModule {}
