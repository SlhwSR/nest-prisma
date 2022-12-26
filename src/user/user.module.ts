import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[PassportModule],
  controllers: [UserController],
  providers: [UserService,JwtStrategy]
})
export class UserModule {}
