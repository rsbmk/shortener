import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { DB } from './db/db.service';
import { SorturlModule } from './sorturl/sorturl.module';
import { SortUrlRepository } from './sorturl/sorturl.repository';
import { SorturlService } from './sorturl/sorturl.service';

@Module({
  imports: [SorturlModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [SorturlService, SortUrlRepository, DB],
  exports: [],
})
export class AppModule {}
