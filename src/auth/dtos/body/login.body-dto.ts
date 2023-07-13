import { PickType } from '@nestjs/swagger';

import { UserEntity } from 'src/user/entities/user.entity';

export class LoginBodyDto extends PickType(UserEntity, ['email', 'password']) {}
