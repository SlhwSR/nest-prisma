import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExistsRule } from 'src/common/rules/is-exits.rule';
import { IsNotExistsRule } from '../../common/rules/is-not-exits.rule';

export class dianzanDto {
  @IsNotEmpty({ message: '评论id必填!' })
  commentId: number;
//   @IsNotExistsRule('likelist', { message: '只能点赞一次' })
  @IsNotEmpty({ message: 'userId不能为空' })
  userId: number;
  @IsOptional()
  count: number;
}
