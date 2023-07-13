import { Module } from '@nestjs/common';

import { MessageController } from './message.controller';

import { MessageService } from './message.service';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [],
})
export class MessageModule {}
