import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';
import { GroupEntity } from 'src/group/entities/group.entity';
import { UserToGroupEntity } from 'src/group/entities/user-to-group.entity';
import { MessageEntity } from 'src/message/entities/message.entity';

import { ApiSchema } from '@shared/common/decorators/api-schema.decorator';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.users })
@ApiSchema({ name: 'User' })
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column()
  @IsStrongPassword()
  @ApiProperty()
  password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullName: string;

  @OneToMany(() => GroupEntity, (group) => group.user)
  @ApiPropertyOptional({ type: () => [GroupEntity] })
  groups?: GroupEntity[];

  @OneToMany(() => MessageEntity, (message) => message.user)
  @ApiPropertyOptional({ type: () => [MessageEntity] })
  messages?: MessageEntity[];

  @OneToMany(() => UserToGroupEntity, (userToGroup) => userToGroup.user)
  @ApiPropertyOptional({ type: () => [UserToGroupEntity] })
  userToGroups?: UserToGroupEntity[];
}
