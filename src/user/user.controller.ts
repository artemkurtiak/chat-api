import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, OmitType } from '@nestjs/swagger';

import { UserService } from './user.service';

import { UserEntity } from './entities/user.entity';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Ctx } from 'src/auth/decorators/ctx.decorator';

@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @Auth()
  @ApiOkResponse({
    description: 'Successfull current user getting',
    type: OmitType(UserEntity, ['password', 'groups']),
  })
  @ApiOperation({ summary: 'Get current user' })
  getMe(@Ctx('userId') userId: number) {
    return this.userService.getMe(userId);
  }
}
