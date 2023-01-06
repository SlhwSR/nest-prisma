import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryVideoDto } from './dto/create-category-video.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(private prismaService: PrismaService) {}
  async create(createVideoDto: CreateVideoDto) {
    await this.prismaService.video.create({
      data: {
        url: createVideoDto.url,
        poster: createVideoDto.poster,
        videoCategoryId: createVideoDto.videoCategoryId,
      },
    });

    return {
      data: {
        code: 200,
        message: '创建成功！',
      },
    };
  }
  async createCategory(createCategory: CreateCategoryVideoDto) {
    await this.prismaService.videocategory.create({
      data: {
        ...createCategory,
      },
    });
    return {
      data: {
        code: 200,
        message: '创建成功',
      },
    };
  }
  async getCategory() {
    const result = await this.prismaService.videocategory.findMany({
      include: {
        videos: true,
      },
    });
    return {
      data: {
        list: result,
      },
    };
  }
  async findAll() {
    const result = await this.prismaService.video.findMany({
      include:{
        videoCategory:true
      }
    });
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
