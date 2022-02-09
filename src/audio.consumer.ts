
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    console.log(job.data, 'in');
    let progress = 0;
    for (var i = 0; i < 100; i++) {
      //await doSomething(job.data);
      progress += 10;
      await job.progress(progress);
    }
    return {jobid: job.id, jobdata: job.data, jobstatus: job.isActive};
  }
}
