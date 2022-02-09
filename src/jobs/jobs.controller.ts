import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BanchmarkInterceptor } from 'src/interceptor/benchmark-intercepter';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsService } from './jobs.service';

@ApiTags('Jobs')
@Controller({path: '/jobs', version: '1'})
@UseInterceptors(BanchmarkInterceptor)
export class JobsController {
  constructor(protected jobService: JobsService) {}

  @Post()
  async createJob(@Body() job: CreateJobDto) {
    try {
      return this.jobService.createNewjob(job);
    } catch (error) {
      return error;
    }
  }
  @Get()
  async allJobs() {
    try {
      return this.jobService.allJobs();
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  async updateJobDetail(
    @Param('id') jobId: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    try {
      return await this.jobService.updateJobdetail(jobId, updateJobDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async deleteJob(@Param('id') jobId: string) {
    try {
      await this.jobService.deleteJob(jobId);
    } catch (error) {
      return error;
    }
  }

  @Get('testing')
  getHelloFromOtherService() {
    return this.jobService.returnHelloFromOtherServide();
  }
}
