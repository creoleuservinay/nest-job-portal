import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('testing')
export class TestController {
  constructor(protected testService: TestService) {}
  @Get()
  testMethod() {
    return this.testService.getHello();
  }
}
