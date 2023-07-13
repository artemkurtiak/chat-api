import { ApiProperty, OmitType } from '@nestjs/swagger';

import { BaseUserItem } from 'src/user/docs';

import { MessageEntity } from '../entities/message.entity';

import { ApiSchema } from '@shared/common/decorators/api-schema.decorator';

@ApiSchema({ name: 'BaseMessageItem' })
export class BaseMessageItem extends OmitType(MessageEntity, ['group', 'user']) {
  @ApiProperty()
  user: BaseUserItem;
}
