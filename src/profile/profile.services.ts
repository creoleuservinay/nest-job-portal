import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Job } from "src/jobs/schemas/job.schema";
import { Profile, ProfileDocument } from "./schemas/profile.schema";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>
  ) {}
  uploadProfileDetail(file: any){
    return this.profileModel.create({title: file.filename});
  }

  returnAllImages(){
    return this.profileModel.find({});
  }
}