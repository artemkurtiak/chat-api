import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GroupEntity } from './group.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { ApiSchema } from '@shared/common/decorators/api-schema.decorator';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.userToGroups })
@ApiSchema({ name: 'UserToGroup' })
export class UserToGroupEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.userToGroups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @Column()
  @ApiProperty()
  userId: number;

  @ManyToOne(() => GroupEntity, (group) => group.userToGroups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group?: GroupEntity;

  @Column()
  @ApiProperty()
  groupId: number;
}
