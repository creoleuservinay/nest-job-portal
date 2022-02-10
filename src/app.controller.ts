import { BullModule, Processor } from '@nestjs/bull';
import { Controller, Get, Logger, Render } from '@nestjs/common';
import { Cron, CronExpression, Interval, SchedulerRegistry } from '@nestjs/schedule';
import { AppService } from './app.service';
import { AudioConsumer } from './audio.consumer';

@Controller()
export class AppController {
  private readonly logger = new Logger();
  constructor(
    private readonly appService: AppService,
    private schedulerRegistry: SchedulerRegistry,
  ) { }

  @Get()
  getHello(): Promise<any> {
    return this.appService.getHello();
  }

  @Get('profile')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Cron('30 * * * * *', {
    name: 'notifications',
  })
  handleCron() {
    this.logger.log('Calling in every second');
    const job = this.schedulerRegistry.getCronJob('notifications');
    job.stop();
  }
}
