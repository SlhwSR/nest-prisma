import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {PrismaClient} from '@prisma/client'
@Injectable()
export class ArticleService {
  prisma:PrismaClient
  constructor(){
    this.prisma=new PrismaClient()
  }
  async create(createArticleDto: CreateArticleDto) {
   const res=await this.prisma.article.create({
      data:{
        ...createArticleDto
      }
    })
    return res
  } 

  async findAll(page) {
    const result=await this.prisma.article.findMany({
      take:+page?.pageSize?+page?.pageSize:10,
      skip:(page?.current-1)*page?.pageSize+1,
      orderBy:{
        id:'desc'
        // content:"asc",
      }
    })
    const total=await this.prisma.article.count()
    return {data:[...result],total}; 
  }
  async findOne(id: number) {
   const result=await this.prisma.article.findFirst({
    where:{
      id
    }
   })
    return result;
  }
  async findSome(title:string){
    console.log(title);
    const result =await this.prisma.article.findMany({
      where:{
        title:{ 
           contains:title
        } 
      }
    })
    return result
  }
  async update(id: number, updateArticleDto: UpdateArticleDto) {
   const result= await this.prisma.article.update({
        where:{
          id:id
        },
        data:{
          ...updateArticleDto
        }
       })
    return result;
  }

  async remove(id: number) {
    const result =await this.prisma.article.delete({
      where:{
        id
      }
    })
    return result
  }
}
 