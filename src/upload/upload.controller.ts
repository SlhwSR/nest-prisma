import { Controller, MethodNotAllowedException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Upload,fileFilter, Image, Document, Markdown } from './decorator/upload.decorator';

@Controller('upload')
export class UploadController {
    @Post('image')
    @Image()
    uploadImage(@UploadedFile() file:Express.Multer.File){
        return file 
    }
    @Post("document")
    // @Document()
    @Markdown('file',['image','pdf'])
    uploadDoc(@UploadedFile() file:Express.Multer.File){
      return file
    }
}
