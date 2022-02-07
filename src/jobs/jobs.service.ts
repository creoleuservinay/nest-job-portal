import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './schemas/job.schema';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}
  async createNewjob(job: CreateJobDto) {
    return await this.jobModel.create(job);
  }
  async allJobs() {
    return await this.jobModel.find({});
  }

  async updateJobdetail(jobId: string, updatedJob: UpdateJobDto) {
    return await this.jobModel.findByIdAndUpdate(jobId, updatedJob).exec();
  }

  async deleteJob(jobId: string) {
    return await this.jobModel.deleteOne({ _id: Object(jobId) });
  }
}
