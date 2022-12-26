import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {PrismaClient} from '@prisma/client'
import * as argon2 from 'argon2'
import { LoginDto } from './dto/create-auth-login.dto';
import {JwtService} from '@nestjs/jwt'
@Injectable()
export class AuthService {
  prisma:PrismaClient
  constructor(private jwt:JwtService){
    this.prisma=new PrismaClient()
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  async register(createAuthDto:CreateAuthDto){
     const password=await argon2.hash(createAuthDto.password)
     const user= this.prisma.user.create({
       data:{
        email:createAuthDto.email,
        password
       }
     })
     delete (await user).password
     return user
  }
  async login({email,password}:LoginDto){
     const user=await this.prisma.user.findUnique({
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
  findAll() {
    return `This action returns all auth`;
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
