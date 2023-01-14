import { IsNotEmpty } from "class-validator";
export class ReplyDto{
    @IsNotEmpty({message:'评论人Id不能为空'})
    userId:number
    @IsNotEmpty({message:"评论id不能为空!"})
    commentId:number
    @IsNotEmpty({message:"评论内容不能为空!"})
    replyContent:string
}