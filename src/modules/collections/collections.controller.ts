import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CollectionService } from './collections.service';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get(':name')
  getCollection(@Param('name') name: string): any {
    return this.collectionService.getCollection(name);
  }

  @Get(':coll/:doc')
  getDoc(@Param('coll') coll: string, @Param('doc') doc: string): any {
    return this.collectionService.getDoc(coll, doc);
  }

  @Post(':coll/:doc')
  createDoc(
    @Param('coll') coll: string,
    @Param('doc') doc: string,
    @Body() data: any,
  ): any {
    return this.collectionService.createDoc(coll, doc, data);
  }

  @Put(':coll/:doc')
  updateDoc(
    @Param('coll') coll: string,
    @Param('doc') doc: string,
    @Body() data: any,
  ): any {
    return this.collectionService.updateDoc(coll, doc, data);
  }
}
