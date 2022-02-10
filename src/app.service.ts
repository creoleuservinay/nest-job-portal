import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { AudioConsumer } from './audio.consumer';

@Injectable()
export class AppService {
  constructor(@InjectQueue('audio') private audioQueue: Queue,
      private audioconsumer: AudioConsumer
  ) {}
  
  async getHello(): Promise<any> {
  const job = await this.audioQueue.add({
    foo: 'bar',
  });
  console.log(job, 'Created');

  return this.audioconsumer.transcode(job);
    return 'Hello World! From here';
  }
}
