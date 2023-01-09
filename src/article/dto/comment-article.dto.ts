import {IsNotEmpty, Length} from 'class-validator'
export class CommentArticleDto {
    @IsNotEmpty({message:'内容不能为空'})
    content:string
    @IsNotEmpty({message:"用户id不能为空!"})
    userId:number
    @IsNotEmpty({message:"文章id不能为空"})
    articleId:number
}
 