import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
import {PassportStrategy} from '@nestjs/passport'
import { PrismaClient } from '@prisma/client';
import {ExtractJwt,Strategy} from 'passport-jwt'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    pirsma:PrismaClient
    constructor(configService:ConfigService){
        super({  
            //解析用户提交的header中的Bearer Token数据
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            //加密码的secret
            secretOrKey:configService.get('token_secret')
        })
        this.pirsma=new PrismaClient()
    }
    async validate({sub:id}){
        return this.pirsma.user.findUnique({ 
            where:{
                id
            } 
        })
    }  
}