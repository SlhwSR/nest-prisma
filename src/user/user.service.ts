import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash, verify } from 'argon2';
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
      include: {
        category: true,
      },
      // include: {
      //   category: {
      //     include: {
      //       article:true
      //     },
      //   },
      // },
    });
    const total = result.length;
    return { data: [...result], total };
  }
  async updateAvatar(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        avatar: updateUserDto.avatar,
      },
    });
    return result;
  }
  async modify(
    id: number,
    body: { newPassword: string; oldPassword: string; confirmPassword: string },
  ) {
    const result = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!result) throw new BadRequestException('不存在该用户！');
    console.log(body.oldPassword);
    console.log(result.password);
    const isture = await verify(result.password, body.oldPassword);
    console.log(isture);

    if (!isture) throw new BadRequestException('旧密码不正确!');
    if (body.newPassword !== body.confirmPassword)
      throw new BadRequestException('新密码确认不相同！');
    const newpassword = await hash(body.newPassword);
    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password: newpassword,
      },
    });
    return {
      data: {
        code: 200,
        meessage: '修改成功',
      },
    };
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  } 
}
