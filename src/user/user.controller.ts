import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //AuthGuard守卫使用jwt策略进行验证
  //jwt.strategy.ts 中 validate结果会保存到req请求数据中
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Req() req:Request) { 
    console.log(req);
    return req?.user;  
  }   
}   