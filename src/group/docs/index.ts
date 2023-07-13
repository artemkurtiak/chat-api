import { ApiProperty, OmitType } from '@nestjs/swagger';

import { BaseMessageItem } from 'src/message/docs';
import { BaseUserItem } from 'src/user/docs';

import { GroupEntity } from '../entities/group.entity';
import { UserToGroupEntity } from '../entities/user-to-group.entity';

import { ApiSchema } from '@shared/common/decorators/api-schema.decorator';

@ApiSchema({ name: 'BaseGroupItem' })
export class BaseGroupItem extends OmitType(GroupEntity, ['user', 'userToGroups', 'messages']) {}

@ApiSchema({ name: 'ExtendedUserToGroupItem' })
export class ExtendedUserToGroupItem extends OmitType(UserToGroupEntity, ['group', 'user']) {
  @ApiProperty()
  user: BaseUserItem;
}

@ApiSchema({ name: 'ExtendedGroupItem' })
export class ExtendedGroupItem extends BaseGroupItem {
  @ApiProperty()
  user: BaseUserItem;

  @ApiProperty({ type: [ExtendedUserToGroupItem] })
  userToGroups: ExtendedUserToGroupItem[];

  @ApiProperty({ type: [BaseMessageItem] })
  messages: BaseMessageItem[];
}
