import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserVerifyDto } from './dto/user-verify.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor( @InjectModel(User.name) private UserModel: Model<UserDocument>,){}
  
  async createUser(createUserDto){
    console.log(createUserDto, 'from user service');
    return this.UserModel.create(createUserDto);
  }

  async findByUserId(username:string) {
      const user = this.UserModel.findOne({username: username});
      if(user){
          return user;
      }
    }
}
