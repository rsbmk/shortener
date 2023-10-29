import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateSorturlDto } from './dto';
import { SorturlService } from './sorturl.service';

@Controller('sorturl')
export class SorturlController {
  constructor(private readonly sorturlService: SorturlService) {}

  @Post()
  create(@Body() createSorturlDto: CreateSorturlDto, @Req() req: Request) {
    const origin = req.headers.origin;

    try {
      return this.sorturlService.create({ origin, url: createSorturlDto.url });
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
