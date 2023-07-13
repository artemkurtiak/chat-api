import { Module } from '@nestjs/common';

import { GroupController } from './group.controller';

import { GroupService } from './group.service';

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [],
})
export class GroupModule {}
