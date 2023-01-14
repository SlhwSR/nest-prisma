import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
// import { JwtStrategy } from './auth/jwt.strategy';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { CategoryModule } from './category/category.module';
import { VideoModule } from './video/video.module';
import * as redisStores from 'cache-manager-redis-store';
@Module({
  imports: [
    ArticleModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [],
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      host: 'localhost',
      port: 6379,
      // store: redisStores,
    }),
    // Cache

    UserModule,
    PrismaModule,
    UploadModule,
    CategoryModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
