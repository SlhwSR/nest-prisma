import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentArticleDto } from './dto/comment-article.dto';
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
  //-------------
  async addOneComment(comment: CommentArticleDto) {
    await this.PrismaService.comment.create({
      data: {
        articleId: comment.articleId,
        content: comment.content,
        userId: comment.userId,
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
        comment: true,
      },
    });
    return {
      data: [...result],
    };
  }
}
