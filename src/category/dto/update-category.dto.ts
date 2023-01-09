import { IsNotEmpty, Length } from "class-validator";
import { IsNotExistsRule } from "src/common/rules/is-not-exits.rule";

export class UpdateCategoryDto {
@IsNotEmpty({message:"分类名称不能为空"})
@Length(2,10,{message:"长度必须在2-10位内"})
name:string
@IsNotEmpty({message:"封面不能为空"})
cover:string
// @IsNotEmpty({message:"用户id不能为空"})
// userId:number
}