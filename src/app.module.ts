import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { Job, JobSchema } from './jobs/schemas/job.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JobsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-job-portal'),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
