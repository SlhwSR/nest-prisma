import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsExistsRule } from '../../common/rules/is-exits.rule';
export class LoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsEmail({}, { message: '用户名必须是邮箱' })
  @IsExistsRule('user', { message: '账号不存在' })
  email: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
