import { PickType } from '@nestjs/swagger';

import { GroupEntity } from 'src/group/entities/group.entity';

export class CreateGroupBodyDto extends PickType(GroupEntity, ['name']) {}
