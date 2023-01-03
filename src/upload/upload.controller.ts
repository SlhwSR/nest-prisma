import {
  Controller,
  Ip,
  MethodNotAllowedException,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Upload,
  fileFilter,
  Image,
  Document,
  Markdown,
} from './decorator/upload.decorator';

@Controller('upload')
export class UploadController {
  @Post('image')
  @Image()
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
  @Post('document')
  // @Document()
  @Markdown('file', ['image', 'pdf'])
  uploadDoc(@UploadedFile() file: Express.Multer.File, @Ip() ip) {
    // console.log(ip);
    return file;
  }
  @Post('editorPic')
  @Image()
  uploadEditor(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    return {
      errno: 0,
      data: {
        url: 'http://localhost:3000/uploads/' + file.filename,
      },
    }; 
  }
}
