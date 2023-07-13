import { Injectable } from '@nestjs/common';

import { Socket } from 'socket.io';

import { DatabaseService } from '@shared/database/services/database.service';

import { OnMessageBodyDto } from './dtos/body/on-message.body-dto';

@Injectable()
export class ChatService extends DatabaseService {
  onMessage(socket: Socket, body: OnMessageBodyDto) {
    const { groupId, text } = body;
  }
}
