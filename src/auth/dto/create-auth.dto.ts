import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({message:"用户名不能为空"})
    @IsEmail({},{message:"用户名必须是邮箱"})
    email:string
    @IsNotEmpty({message:"密码不能为空"})
    password:string
}
