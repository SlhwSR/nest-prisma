import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {PrismaClient} from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ArticleService {
  constructor(private PrismaService:PrismaService){
  }
  async create(createArticleDto: CreateArticleDto) {
   const res=await this.PrismaService.article.create({
      data:{
        ...createArticleDto
      }
    })
    return res
  } 

  async findAll(page) {
    const result=await this.PrismaService.article.findMany({
      take:+page?.pageSize?+page?.pageSize:10,
      skip:(page?.current-1)*page?.pageSize+1,
      orderBy:{
        id:"asc"
        // content:"asc",
      }
    })
    const total=await this.PrismaService.article.count()
    return {data:[...result],total}; 
  }
  async findOne(id: number) {
   const result=await this.PrismaService.article.findFirst({
    where:{
      id
    }
   })
    return result;
  }
  async findSome(title:string){
    const result =await this.PrismaService.article.findMany({
      where:{
        title:{ 
           contains:title
        },
      },
      orderBy:{
        id:"asc"
      } 
    })
    return result
  }
  async update(id: number, updateArticleDto: UpdateArticleDto) {
   const result= await this.PrismaService.article.update({
        where:{
          id
        },
        data:{
          ...updateArticleDto
        }
       })
    return result;
  }

  async remove(id: number) {
    const result =await this.PrismaService.article.delete({
      where:{
        id
      }
    })
    return result
  }
}
 