import { AccessTokenEntity } from 'src/auth/entities/access-token.entity';
import { RefreshTokenEntity } from 'src/auth/entities/refresh-token.entity';
import { GroupEntity } from 'src/group/entities/group.entity';
import { UserToGroupEntity } from 'src/group/entities/user-to-group.entity';
import { MessageEntity } from 'src/message/entities/message.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { DatabaseRepository } from '../repositories/database.repository';

export type DatabaseEntitiesType = {
  users: UserEntity;
  accessTokens: AccessTokenEntity;
  refreshTokens: RefreshTokenEntity;
  groups: GroupEntity;
  userToGroups: UserToGroupEntity;
  messages: MessageEntity;
};

export type DatabaseRepositories = {
  [table in keyof DatabaseEntitiesType]: DatabaseRepository<DatabaseEntitiesType[table]>;
};
