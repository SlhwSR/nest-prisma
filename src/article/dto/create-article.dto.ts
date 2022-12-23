import {IsNotEmpty, Length} from 'class-validator'
export class CreateArticleDto {
    @Length(5,10,{message:"必须大于5个字且小于10个字"})
    @IsNotEmpty({message:'内容不能为空'})
    title:string
    @Length(30,100,{message:"必须大于30个字且小于200个字"})
    @IsNotEmpty({message:"内容不能为空!"})
    content:string
}
 