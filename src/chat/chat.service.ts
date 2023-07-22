import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { DatabaseService } from '@shared/database/services/database.service';
import { GroupService } from 'src/group/group.service';

import { OnJoinBodyDto } from './dtos/body/on-join.body.dto copy';
import { OnLeaveBodyDto } from './dtos/body/on-leave.body.dto';
import { OnMessageBodyDto } from './dtos/body/on-message.body-dto';

import { SocketEventPayload } from './types';

@Injectable()
export class ChatService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly groupService: GroupService,
  ) {
    super(datasource);
  }

  async onMessage(body: SocketEventPayload<OnMessageBodyDto>) {
    const { groupId, text, userId, server } = body;
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    await this.database.userToGroups.findOneOrFail({ where: { groupId, userId } });
    const message = await this.database.messages.create({ groupId, text, userId });

    server.to(`${groupId}`).emit('message', { ...message, user });
  }

  async onLeave(body: SocketEventPayload<OnLeaveBodyDto>) {
    const { groupId, userId, socket, server } = body;
    await this.groupService.leaveGroup(groupId, userId);
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });

    socket.leave(`${groupId}`);
    server.to(`${groupId}`).emit('leave', { user });
  }

  async onJoin(body: SocketEventPayload<OnJoinBodyDto>) {
    const { groupId, userId, socket, server } = body;
    await this.groupService.joinGroup(groupId, userId);
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });

    socket.join(`${groupId}`);
    server.to(`${groupId}`).emit('join', { user });
  }
}
