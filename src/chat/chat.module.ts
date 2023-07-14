import { Module } from '@nestjs/common';

import { ChatService } from './chat.service';
import { GroupService } from 'src/group/group.service';

import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, ChatService, GroupService],
  exports: [],
})
export class ChatModule {}
