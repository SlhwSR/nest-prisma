import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { IsExistsRule } from '../../common/rules/is-exits.rule';
// import { IsNotExistsRule } from '../../common/rules/is-not-exits.rule';
import { IsNotExistsRule } from '../../common/rules/is-not-exits.rule';

export class CreateAuthDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsEmail({}, { message: '用户名必须是邮箱' })
  // @IsNotExistsRule('user', { message: '该用户已存在' })
  @IsNotExistsRule('user', { message: '用户已存在!' })
  email: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
  @IsOptional()
  avatar: string;
}
