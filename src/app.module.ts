import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { SorturlModule } from './sorturl/sorturl.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SorturlModule, ConfigModule.forRoot(), AuthModule, UsersModule],
  controllers: [AppController],
})
export class AppModule {}
