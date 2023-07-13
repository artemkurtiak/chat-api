import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { UserToGroupEntity } from './user-to-group.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';
import { MessageEntity } from 'src/message/entities/message.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { ApiSchema } from '@shared/common/decorators/api-schema.decorator';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.groups })
@ApiSchema({ name: 'Group' })
export class GroupEntity extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @ApiPropertyOptional({ type: () => UserEntity })
  user?: UserEntity;

  @Column()
  @ApiProperty()
  userId: number;

  @OneToMany(() => UserToGroupEntity, (userToGroup) => userToGroup.group)
  @ApiPropertyOptional({ type: [UserToGroupEntity] })
  userToGroups?: UserToGroupEntity[];

  @OneToMany(() => MessageEntity, (message) => message.group)
  @ApiPropertyOptional({ type: () => [MessageEntity] })
  messages?: MessageEntity[];
}
