import { Module } from '@nestjs/common';

import { ChatService } from './chat.service';

import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, ChatService],
  exports: [],
})
export class ChatModule {}
