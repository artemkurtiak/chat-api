import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AuthenticationCookiesType } from '../types';

export const Cookie = createParamDecorator(
  (field: keyof AuthenticationCookiesType, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.cookies?.[field] ?? request.cookies;
  },
);
