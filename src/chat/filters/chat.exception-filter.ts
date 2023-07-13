import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

import { Socket } from 'socket.io';

@Catch(HttpException)
export class ChatExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const socket: Socket = host.switchToHttp().getRequest();

    socket.emit('error', exception.message);
  }
}
