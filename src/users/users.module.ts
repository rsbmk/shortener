import { Module } from '@nestjs/common';

import { SorturlModule } from 'src/sorturl/sorturl.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.reppsitory';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
  imports: [SorturlModule],
})
export class UsersModule {}
