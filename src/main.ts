import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Auth } from './auth/decorator/auth.decoator';
import { AuthGuard } from '@nestjs/passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import Validate from './common/validate';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('uploads', { prefix: '/uploads' });
  app.enableCors();
  // app.useGlobalGuards( )
  // app.useGlobalGuards(.)
  app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalPipes(new Validate());
  await app.listen(3000); 
}
bootstrap();
