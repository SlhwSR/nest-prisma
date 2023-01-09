import {
  Controller,
  Ip,
  Post,
  UploadedFile,
} from '@nestjs/common';
import {
  Image,
  Markdown,
  Video,
} from './decorator/upload.decorator';

@Controller('upload')
export class UploadController {
  @Post('image')
  @Image()
  uploadImage(@UploadedFile() file: Express.Multer.File) { 
    return file;
  }
  @Post('document')
  @Markdown('file', ['image', 'pdf'])
  uploadDoc(@UploadedFile() file: Express.Multer.File, @Ip() ip) {
    return file; 
  }
  @Post('editorPic')
  @Image()
  //富文本上传图片。    
  uploadEditor(@UploadedFile() file: Express.Multer.File) {
    return {
      errno: 0,
      data: {
        url: 'http://localhost:3000/uploads/' + file.filename,
      },
    }; 
  }
  @Post("video")
  @Video()
  uploadVideo(@UploadedFile() file:Express.Multer.File){
    console.log(file);
    return {
      errno:0,
      data:{
        url:"http://localhost:3000/uploads/"+file.filename
      }
    }
  }
}
