import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { ONE_WEEK_IN_SECONDS } from 'src/constanst';
import { UserAuth } from 'src/users/entities/user.entity';
import { User } from 'src/users/user.decorator';
import { Public } from 'src/users/users.controller';
import { CreateSorturlDto } from './dto';
import { SorturlService } from './sorturl.service';

@Controller('sorturl')
export class SorturlController {
  constructor(private readonly sorturlService: SorturlService) {}

  @Post()
  create(
    @Body() { url, name }: CreateSorturlDto,
    @User() user: UserAuth,
    @Query('temporal') temporal: boolean = false,
    @Query('ttl') ttl: string = String(ONE_WEEK_IN_SECONDS),
  ) {
    return this.sorturlService.create({ url, name, userId: user.id, options: { temporal, ttl } });
  }

  @Public()
  @Post('temporal')
  temporalCreate(@Body() { url, name }: CreateSorturlDto) {
    return this.sorturlService.temporalCreate({ url, name, userId: 0 });
  }

  @Get('user')
  findAllByUser(@User() user: UserAuth, @Query('temporal') temporal: boolean = false) {
    if (temporal) return this.sorturlService.findAllTemporalsByUser(user.id);
    return this.sorturlService.findAllByUser(user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sorturlService.remove(+id);
  }
}
