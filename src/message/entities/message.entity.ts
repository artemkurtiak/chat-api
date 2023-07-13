import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';
import { GroupEntity } from 'src/group/entities/group.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.messages })
export class MessageEntity extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @ManyToOne(() => GroupEntity, (group) => group.messages)
  @JoinColumn({ name: 'groupId' })
  @ApiPropertyOptional({ type: () => GroupEntity })
  group?: GroupEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  @ApiPropertyOptional({ type: () => UserEntity })
  user?: UserEntity;

  @Column()
  @ApiProperty()
  groupId: number;

  @Column()
  @ApiProperty()
  userId: number;
}
