import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { CreateSorturlDto } from './dto';
import { SorturlService } from './sorturl.service';

@Controller('sorturl')
export class SorturlController {
  constructor(private readonly sorturlService: SorturlService) {}

  @Post()
  create(@Body() createSorturlDto: CreateSorturlDto) {
    try {
      return this.sorturlService.create({ url: createSorturlDto.url });
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
