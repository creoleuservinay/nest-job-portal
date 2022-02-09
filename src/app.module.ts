import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { Job, JobSchema } from './jobs/schemas/job.schema';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { AudioConsumer } from './audio.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port:6379
      }
    }),

    BullModule.registerQueue({
      name: 'audio',
    }),
    ScheduleModule.forRoot(),
    CacheModule.register(),
    JobsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-job-portal'),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, AudioConsumer],
})
export class AppModule {}
