import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getHello() {
    return 'Hello from service working!!';
  }
}
