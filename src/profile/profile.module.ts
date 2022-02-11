import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Job } from "src/jobs/schemas/job.schema";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.services";
import { Profile, ProfileSchema } from "./schemas/profile.schema";

@Module({
  imports:[
    HttpModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [],
})
export class ProfileModule{};