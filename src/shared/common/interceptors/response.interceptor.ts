import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable, map } from 'rxjs';

import { recursiveRemoveKey } from '../helpers';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Object) recursiveRemoveKey(data, 'password');

        return data;
      }),
    );
  }
}
