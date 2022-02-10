import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path/posix";
import { ProfileService } from "./profile.services";

@ApiTags('Profile')
@Controller({ path: '/profile', version: '1' })
export class ProfileController {
  constructor(private profileService: ProfileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
          const date = new Date();
          const uniqueImageName = 'User_'+date.getDate() + '_' + date.getTime() + '_' + date.getSeconds();
          const randomName =  uniqueImageName;
             return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  async uploadedFile(@UploadedFile() file) {
    return this.profileService.uploadProfileDetail(file);
  }

  @Post('gallery')
  @UseInterceptors(
    FilesInterceptor('gallery_img', 20, {
      storage: diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
          const randomName = Date();
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
    ),
  )
  async uploadedFileMul(@UploadedFiles() file: Express.Multer.File) {
    console.log('Miltiple  file upload');
    return file;
  }

  @Get('images')
  async allImages(){
    return this.profileService.returnAllImages();
  }
}
