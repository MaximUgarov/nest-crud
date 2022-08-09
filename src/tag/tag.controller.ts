import { GetTagQuery } from './dto/get-tag.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from './../user/dto/user.dto';
import { Controller, Get, Post, Body, Param, UseGuards, Put, Injectable, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { User } from 'src/user/user.decorator';

@Injectable()
@Controller('tag')
export class TagController {

  constructor(private readonly tagService: TagService) { }

  @Get()
  @UseGuards(AuthGuard)
  get(@Query() tagQuery: GetTagQuery) {
    const { pageSize, page } = tagQuery
    return this.tagService.get({ sort: { byName: Object.prototype.hasOwnProperty.call(tagQuery, 'sortByName'), byOrder: Object.prototype.hasOwnProperty.call(tagQuery, 'sortByOrder') }, meta: { pageSize, page } });
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTagDto: CreateTagDto, @User() { uid }: GetUser) {
    return this.tagService.create(createTagDto, uid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @User() { uid: creator }: GetUser, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, creator, updateTagDto);
  }

}
