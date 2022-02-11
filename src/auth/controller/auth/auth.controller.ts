import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller({path:'auth', version: '1'})
export class AuthController {

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req){
  
  }
}
