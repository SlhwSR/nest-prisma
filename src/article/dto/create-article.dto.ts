import {IsNotEmpty, Length} from 'class-validator'
export class CreateArticleDto {
    @Length(5,10,{message:"必须大于5个字且小于10个字"})
    @IsNotEmpty({message:'内容不能为空'})
    title:string
    @Length(30,2000,{message:"必须大于30个字且小于2000个字"})
    @IsNotEmpty({message:"内容不能为空!"})
    content:string
    @IsNotEmpty({message:"分类必选"})
    categoryId:number
}
 