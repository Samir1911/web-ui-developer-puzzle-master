import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Book } from '@tmo/shared/models';
import { ReadingListService } from './reading-list.service';

@Controller('/reading-list')
export class ReadingListController {
  constructor(private readonly readingList: ReadingListService) {}

  @Get('/')
  async getReadingList() {
    return await this.readingList.getList();
  }

  @Post('/')
  async addToReadingList(@Body() item: Book) {
    return await this.readingList.addBook(item);
  }

  @Delete('/:id')
  async removeFromReadingList(@Param() params) {
    return await this.readingList.removeBook(params.id);
  }
}
