import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { SorturlModule } from './sorturl/sorturl.module';

@Module({
  imports: [SorturlModule, ConfigModule.forRoot(), AuthModule],
  controllers: [AppController],
})
export class AppModule {}
