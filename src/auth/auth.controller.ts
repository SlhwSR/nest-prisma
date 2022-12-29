import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth } from './decorator/auth.decoator';
import { LoginDto } from './dto/create-auth-login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {Request} from 'express'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  } 
  @Post("login")
  login(@Body() data:LoginDto){
  return this.authService.login(data)
 }

  @Get('all')
  @Auth() 
  findAll(@Req() req:Request) {
    return req.user
  }  
}
