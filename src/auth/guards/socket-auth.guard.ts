import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { decode } from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Injectable()
export class SocketAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const socket: Socket = context.switchToHttp().getRequest();
    const { accessToken } = socket.handshake.headers;

    if (!accessToken) throw new UnauthorizedException('Token is not provided or is not valid');

    const tokenPayload = decode(accessToken as string);

    if (!tokenPayload || !(tokenPayload instanceof Object)) {
      throw new UnauthorizedException('Token is not provided or is not valid');
    }

    socket.handshake.auth = tokenPayload;

    return true;
  }
}
