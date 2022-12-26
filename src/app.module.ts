import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
// import { JwtStrategy } from './auth/jwt.strategy';
import { UserModule } from './user/user.module';

@Module({
  imports: [ArticleModule, AuthModule,ConfigModule.forRoot({
    load:[],
    isGlobal:true
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
