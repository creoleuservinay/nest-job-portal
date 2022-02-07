import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class BanchmarkInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    console.log('Endpoint:, ', request.url);
    console.log('Method:, ', request.method);
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`Excecution... ${Date.now() - now}ms`)));
  }
}
