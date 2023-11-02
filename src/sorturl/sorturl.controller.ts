import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';

import { UsersModel } from 'src/users/entities/user.entity';
import { CreateSorturlDto } from './dto';
import { SorturlService } from './sorturl.service';

@Controller('sorturl')
export class SorturlController {
  constructor(private readonly sorturlService: SorturlService) {}

  @Post()
  create(@Body() { url, name }: CreateSorturlDto, @Req() req: any) {
    // TODO: get user by custom decorator
    const user = req.user as UsersModel;
    try {
      return this.sorturlService.create({ url, name, userId: user.id });
    } catch (error) {
      console.error({ error });
    }

    return 'Something went wrong';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sorturlService.remove(+id);
  }
}
