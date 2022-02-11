import { HttpService } from "@nestjs/axios";
import { Controller, Get, Post, Res, Session, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { AxiosResponse } from "axios";
import { Response } from "express";
import session from "express-session";
import { createReadStream } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path/posix";
import { firstValueFrom, Observable } from "rxjs";
import { ProfileService } from "./profile.services";

@ApiTags('Profile')
@Controller({ path: '/profile', version: '1' })
export class ProfileController {
  constructor(private profileService: ProfileService,
   private httpService: HttpService
    ) { }

  @Get('callparent')
    async findAll(): Promise<AxiosResponse> {
      const response =  await firstValueFrom(this.httpService.get('http://localhost:8000/app-second', {}));
      return response.data;
  }

  @Get('session')
  async getAuthSession(@Session() session: Record<string, any>){
    console.log(session.id);
    session.authenticate = true;
    return session;
  }

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

  @Get('stream')
  getFile(@Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    file.pipe(res);
  }
}
