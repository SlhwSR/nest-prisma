import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
import {PassportStrategy} from '@nestjs/passport'
import { PrismaClient } from '@prisma/client';
import {ExtractJwt,Strategy} from 'passport-jwt'
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private configService:ConfigService,private prismaService:PrismaService){
        super({  
            //解析用户提交的header中的Bearer Token数据
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            //加密码的secret
            secretOrKey:configService.get('token_secret')
        })
    }
    async validate({sub:id}){
        return this.prismaService.user.findUnique({ 
            where:{
                id
            } 
        })
    }   
}