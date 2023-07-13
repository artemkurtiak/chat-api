import { OmitType } from '@nestjs/swagger';

import { UserEntity } from '../entities/user.entity';

import { ApiSchema } from '@shared/common/decorators/api-schema.decorator';

@ApiSchema({ name: 'BaseUserItem' })
export class BaseUserItem extends OmitType(UserEntity, [
  'password',
  'userToGroups',
  'groups',
  'messages',
]) {}
