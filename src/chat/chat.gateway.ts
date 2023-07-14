import { UseFilters, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { parse as parseCookie } from 'cookie';
import { decode } from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { GroupService } from 'src/group/group.service';

import { SocketAuthGuard } from 'src/auth/guards/socket-auth.guard';

import { SocketCtx } from 'src/auth/decorators/socket-ctx.decorator';

import { globalCorsOptions } from '@shared/common/constants';

import { OnJoinBodyDto } from './dtos/body/on-join.body.dto copy';
import { OnLeaveBodyDto } from './dtos/body/on-leave.body.dto';
import { OnMessageBodyDto } from './dtos/body/on-message.body-dto';

import { ChatExceptionFilter } from './filters/chat.exception-filter';

@WebSocketGateway(80, {
  cors: globalCorsOptions,
})
@UseFilters(ChatExceptionFilter)
@UseGuards(SocketAuthGuard)
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly groupService: GroupService,
  ) {}

  async handleConnection(socket: Socket) {
    const { cookie = '' } = socket.handshake.headers;
    const { accessToken } = parseCookie(cookie);

    if (!accessToken) return;

    const tokenPayload = decode(accessToken);

    if (!tokenPayload || !(tokenPayload instanceof Object) || !tokenPayload?.userId) return;

    const userGroups = await this.groupService.getUserGroups(tokenPayload.userId);

    userGroups.forEach(({ id }) => socket.join(`${id}`));
  }

  @SubscribeMessage('message')
  onMessage(
    @ConnectedSocket() socket: Socket,
    @SocketCtx('userId') userId: number,
    @MessageBody() body: OnMessageBodyDto,
  ) {
    return this.chatService.onMessage({
      server: this.server,
      socket,
      userId,
      ...body,
    });
  }

  @SubscribeMessage('leave')
  onLeave(
    @ConnectedSocket() socket: Socket,
    @SocketCtx('userId') userId: number,
    @MessageBody() body: OnLeaveBodyDto,
  ) {
    return this.chatService.onLeave({
      server: this.server,
      socket,
      userId,
      ...body,
    });
  }

  @SubscribeMessage('join')
  onJoin(
    @ConnectedSocket() socket: Socket,
    @SocketCtx('userId') userId: number,
    @MessageBody() body: OnJoinBodyDto,
  ) {
    return this.chatService.onJoin({
      server: this.server,
      socket,
      userId,
      ...body,
    });
  }
}
