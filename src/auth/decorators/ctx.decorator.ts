import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AuthenticationContext } from '../types';

export const Ctx = createParamDecorator(
  (field: keyof AuthenticationContext | undefined, context: ExecutionContext) => {
    const { ctx } = context.switchToHttp().getRequest();

    return field ? ctx[field] : ctx;
  },
);
