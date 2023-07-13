import { CanActivate, ExecutionContext, Injectable, UseFilters, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

import { ChatService } from './chat.service';

import { SocketAuthGuard } from 'src/auth/guards/socket-auth.guard';

import { globalCorsOptions } from '@shared/common/constants';

import { OnMessageBodyDto } from './dtos/body/on-message.body-dto';

import { ChatExceptionFilter } from './filters/chat.exception-filter';

@WebSocketGateway(81, {
  cors: globalCorsOptions,
})
@UseFilters(ChatExceptionFilter)
@UseGuards(SocketAuthGuard)
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('message')
  onMessage(@ConnectedSocket() socket: Socket, @MessageBody() body: OnMessageBodyDto) {
    return this.chatService.onMessage(socket, body);
  }
}
