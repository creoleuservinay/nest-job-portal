import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/utils/LocalStrategy';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService
    },
    {
      provide: 'USER_SERVICE',
      useClass: UserService
    },
    LocalStrategy
  ]
})
export class AuthModule {}
