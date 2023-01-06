import { IsNotEmpty } from "class-validator";

export class CreateVideoDto {
  @IsNotEmpty()
  poster:string
  @IsNotEmpty()
  url:string
  @IsNotEmpty()
  videoCategoryId:number
}
