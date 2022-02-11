import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller({path: 'users', version: '1'})
export class UserController {
  constructor(private userService: UserService){}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto){
    try {
      return this.userService.createUser(createUserDto);
    } catch (error) {
      return error;
    }
  }
}
