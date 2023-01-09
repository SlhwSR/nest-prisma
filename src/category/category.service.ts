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
      include: {
        user: true,
      },
    });
    const total = await this.prismaService.category.count();
    return { data: result, total };
  }
  async findList(userId: number) {
    const result = await this.prismaService.category.findMany({
      where: {
        userId,
      },
    });
    return result;
  }
  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        cover: updateCategoryDto.cover,
        name: updateCategoryDto.name,
      },
    });
    return {
      data: {
        code: 200,
        message: '更新成功',
      },
    };
  }

  async remove(id: number) {
    const result = await this.prismaService.category.delete({
      where: {
        id,
      },
    });
    return { code: 200, message: '删除成功' };
  }
}
