import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.accessTokens })
export class AccessTokenEntity extends BaseEntity {
  @Column()
  @ApiProperty()
  token: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @ApiPropertyOptional()
  user?: UserEntity;

  @Column()
  @ApiProperty()
  userId: number;
}
