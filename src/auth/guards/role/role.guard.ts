import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { user } from '@prisma/client';
import { Observable } from 'rxjs';
import { Role } from 'src/auth/enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //获取当前查找用户
    const user = context.switchToHttp().getRequest().user as user;
    console.log(user);
    //通过反射
    // Role
    const rules = this.reflector.getAllAndMerge<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]); //上下文中方法和控制器
    console.log(rules);
    return rules.length ? rules.some((item) => item === user.role) : true;
    // return true;
  }
}
