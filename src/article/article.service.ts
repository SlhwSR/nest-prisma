import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentArticleDto } from './dto/comment-article.dto';
import { ReplyDto } from './dto/reply.dto';
import { dianzanDto } from './dto/dianzan.dto';
@Injectable()
export class ArticleService {
  constructor(private PrismaService: PrismaService) {}
  async create(createArticleDto: CreateArticleDto) {
    const res = await this.PrismaService.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: createArticleDto.categoryId,
      },
    });
    return res;
  }
  async findAll(page) {
    const result = await this.PrismaService.article.findMany({
      take: +page?.pageSize ? +page?.pageSize : 10,
      skip: (page?.current - 1) * page?.pageSize,
      include: {
        category: {
          include: {
            user: true,
          },
        },
      },
      // orderBy: {
      //   id: 'asc',
      //   // content:"asc",
      // },
    });
    const total = await this.PrismaService.article.count();
    return { data: [...result], total };
  }
  async findOne(id: number) {
    const result = await this.PrismaService.article.findFirst({
      where: {
        id,
      },
    });
    return result;
  }
  async findSome(title: string) {
    const result = await this.PrismaService.article.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      include: {
        category: {
          include: {
            user: true,
          },
        },
      },
    });
    const total = await this.PrismaService.article.count({
      where: {
        title: {
          contains: title,
        },
      },
    });
    return { data: [...result], total: total };
  }
  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const result = await this.PrismaService.article.update({
      where: {
        id,
      },
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        categoryId: +updateArticleDto.categoryId,
        updatedAt: new Date(),
      },
    });
    return result;
  }
  async remove(id: number) {
    const result = await this.PrismaService.article.delete({
      where: {
        id,
      },
    });
    return result;
  }
  //-------------评论
  async addOneComment(comment: CommentArticleDto) {
    await this.PrismaService.comment.create({
      data: {
        articleId: +comment.articleId,
        content: comment.content,
        userId: +comment.userId,
      },
    });
    return {
      data: {
        message: '评论成功',
        code: 200,
      },
    };
  }
  async getCommentList(id) {
    const result = await this.PrismaService.article.findMany({
      where: {
        id,
      },
      include: {
        comment: {
          include: {
            userInfo: true,
            Reply: {
              include: {
                user: true,
              },
            },
            likeList:true
          },
        },
      },
    });
    return {
      data: [...result],
    };
  }
  //--------回复
  async addOneReply(replyDto: ReplyDto) {
    const result = await this.PrismaService.reply.create({
      data: {
        userId: +replyDto.userId,
        commentId: +replyDto.commentId,
        replyContent: replyDto.replyContent,
      },
    });
    return {
      data: {
        message: '回复成功',
        code: 200,
      },
    };
  }

  //点赞
  async dianzan(body:dianzanDto) {
    const result = await this.PrismaService.likeList.create({
      data: {
        commentId:+ body.commentId,
        userId: +body.userId,
      },
    });
    // await this.PrismaService.comment.update({
    //   where: {
    //     id: +body.commentId,
    //   },
    //   data: {
    //     like: like + 1,
    //   },
    // });
    return {
      data: {
        message: '点赞成功!',
        code: 200,
      },
    };
  }
  async replySomeOne(id:number,body){
    await this.PrismaService.reply.update({
      where:{
        id
      },
      data:{
        replyName:body.replay.name
      }
    })
  }
}
