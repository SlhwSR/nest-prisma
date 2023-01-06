import { IsNotEmpty } from "class-validator";
import { IsExistsRule, } from "src/common/rules/is-exits.rule";
import { IsNotExistsRule } from "src/common/rules/is-not-exits.rule";

export class CreateCategoryVideoDto {
  // @IsExistsRule('')
  // @IsNotExistsRule('user', { message: '用户已存在!' })
  @IsNotEmpty()
  @IsNotExistsRule('videocategory',{message:"该分类已存在"})
  name:string
  @IsNotEmpty()
  userId:number
}
  