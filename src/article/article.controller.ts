import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Auth } from 'src/auth/decorator/auth.decoator';
import { ArticleService } from './article.service';
import { CommentArticleDto } from './dto/comment-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { dianzanDto } from './dto/dianzan.dto';
import { ReplyDto } from './dto/reply.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
@Auth()
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }
  @Get()
  findAll(@Query() Page) {
    return this.articleService.findAll(Page);
  } 
  @Get('findSome')
  findSome(@Query('title') content: string) {
    return this.articleService.findSome(content);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
  @Get('personal')
  getComt(@Req() req:Request){
    return req.user
  }
  //--------------------评论
  @Post("comment")
  addOneComment(@Body() Body:CommentArticleDto){
     return this.articleService.addOneComment(Body)
  }
  //根据文章联查评论
  @Get("comment/:id")
  getComment(@Param("id") id){
     return this.articleService.getCommentList(+id)
  }
  //回复评论
  @Post("comment/reply")
  replay(@Body() Body:ReplyDto){
    return this.articleService.addOneReply(Body)
  }
  //回去某条评论
  @Post("comment/reply/:id")
  ReplyOne(@Param('id') id,@Body() Body){
     return this.articleService.replySomeOne(+id,Body)
  }
  @Post("dianzan")
  dianzan(@Body() body:dianzanDto){
    return this.articleService.dianzan(body)
  }
}
