import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as argon2 from 'argon2'
import { LoginDto } from './dto/create-auth-login.dto';
import {JwtService} from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private jwt:JwtService,private PrismaService:PrismaService){ }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  async register(createAuthDto:CreateAuthDto){ 
     const password=await argon2.hash(createAuthDto.password)
    try {
      const user= this.PrismaService.user.create({
        data:{
         email:createAuthDto.email,
         password
        }
      })
      delete (await user).password
      return user
    } catch (error) { 
      throw new BadRequestException("该邮箱已存在!")
    } 
  }
  async login({email,password}:LoginDto){
     const user=await this.PrismaService.user.findUnique({
      where:{
        email
      } 
     });
     if(!user) throw new BadRequestException("用户账号不存在")
     const psMatch=await argon2.verify(user.password,password);
     if(!psMatch) throw new BadRequestException("密码错误");
    //  delete user.password 
     return this.token(user)
  }
  async token(user){
    return {
      token:await this.jwt.signAsync({
        name:user.email,
        sub:user.id
      })
    }
  }  
  async findAll() {
    const result=this.PrismaService.user.findMany()
    return result
  } 

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
