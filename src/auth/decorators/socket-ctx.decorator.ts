import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Socket } from 'socket.io';

import { AuthenticationContext } from '../types';

export const SocketCtx = createParamDecorator(
  (field: keyof AuthenticationContext | undefined, context: ExecutionContext) => {
    const { handshake }: Socket = context.switchToHttp().getRequest();

    return field ? handshake.auth[field] : handshake.auth;
  },
);
