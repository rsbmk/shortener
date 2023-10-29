import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { SortUrlModel } from './sorturl/entities/sorturl.entity';
import { SorturlService } from './sorturl/sorturl.service';

@Controller()
export class AppController {
  constructor(private readonly sorturlService: SorturlService) {}

  @Get(':slug')
  async findOne(@Param('slug') slug: string, @Res() res: Response) {
    let sorturl: SortUrlModel = undefined;

    try {
      sorturl = await this.sorturlService.findOneBySlug({ slug });
    } catch (error) {
      console.error({ error });
    }

    if (sorturl) return res.redirect(sorturl.url);
    return res.send('404 - Not Found');
  }
}
