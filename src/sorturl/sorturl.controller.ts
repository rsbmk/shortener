import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { UserAuth } from 'src/users/entities/user.entity';
import { User } from 'src/users/user.decorator';
import { Public } from 'src/users/users.controller';
import { CreateSorturlDto } from './dto';
import { SorturlService } from './sorturl.service';

@Controller('sorturl')
export class SorturlController {
  constructor(private readonly sorturlService: SorturlService) {}

  @Post()
  create(@Body() { url, name }: CreateSorturlDto, @User() user: UserAuth) {
    return this.sorturlService.create({ url, name, userId: user.id });
  }

  @Public()
  @Post('temporal')
  temporalCreate(@Body() { url, name }: CreateSorturlDto) {
    return this.sorturlService.temporalCreate({ url, name });
  }

  @Get('user')
  findAllByUser(@User() user: UserAuth) {
    return this.sorturlService.findAll(user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sorturlService.remove(+id);
  }
}
