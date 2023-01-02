import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const result = await this.prismaService.category.create({
        data: {
          cover: createCategoryDto.cover,
          name: createCategoryDto.name,
          userId: +createCategoryDto.userId,
        },
      });
      return {
        data: {
          message: '新增成功', 
          code: 200,
        },
      };
    } catch (error) {
      throw new BadRequestException('新增失败');
    }
  }

  async findAll(page) {
    // const result = await this.prismaService.article.findMany({
    //   take: +page?.pageSize ? +page?.pageSize : 10,
    //   skip: (page?.current - 1) * page?.pageSize,
    // });
    const result = await this.prismaService.category.findMany({
      include:{
       user:true 
      }
    });
    const total = await this.prismaService.category.count();
    return { data:result,total};
  }
  async findList(userId:number){
    const result=await this.prismaService.category.findMany({
      where:{
        userId
      }
    })
    return result
  }
  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
