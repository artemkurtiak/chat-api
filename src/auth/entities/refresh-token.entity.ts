import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { AccessTokenEntity } from './access-token.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.refreshTokens })
export class RefreshTokenEntity extends BaseEntity {
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

  @OneToOne(() => AccessTokenEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'accessTokenId' })
  @ApiPropertyOptional()
  accessToken?: AccessTokenEntity;

  @Column()
  @ApiProperty()
  accessTokenId: number;
}
