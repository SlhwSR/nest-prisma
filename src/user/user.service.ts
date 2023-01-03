import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const reuslt = await this.prismaService.user.findFirst({
      where: {
        id,
      },
      include: {
        category: {
          include: {
            article: true,
          },
        },
      },
    });
    return reuslt;
  }
  async findOneUserArticle(id: number) {
    const result = await this.prismaService.article.findMany({
      where: {
        category: {
          user: {
            id,
          },
        },
      },
      include:{
        category:true
      }
      // include: {
      //   category: {
      //     include: {
      //       article:true
      //     },
      //   },
      // },
    });
    const total = result.length;
    return { data: [...result, total] };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #$  id} user`;
  }
}
