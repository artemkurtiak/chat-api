import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthenticationCookiesType } from '@shared/common/types';
import { Response } from 'express';

import { AuthService } from './auth.service';

import { UserEntity } from 'src/user/entities/user.entity';

import { Auth } from './decorators/auth.decorator';
import { Ctx } from './decorators/ctx.decorator';
import { Cookie } from '@shared/common/decorators/cookie.decorator';

import { AccessTokenCookieOptions, RefreshTokenCookieOptions } from './constants';

import { LoginBodyDto } from './dtos/body/login.body-dto';
import { SignUpBodyDto } from './dtos/body/sign-up.body-dto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @ApiConflictResponse({ description: 'User email already exists' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiOperation({ summary: 'Sign up' })
  async signUp(@Res({ passthrough: true }) response: Response, @Body() body: SignUpBodyDto) {
    const { accessToken, refreshToken, user } = await this.authService.signUp(body);

    response.cookie('accessToken', accessToken, AccessTokenCookieOptions);
    response.cookie('refreshToken', refreshToken, RefreshTokenCookieOptions);

    return user;
  }

  @Post('/login')
  @ApiConflictResponse({ description: 'User with provided params does not exists' })
  @ApiCreatedResponse({ type: UserEntity })
  @ApiOperation({ summary: 'Login' })
  async loginWithEmailAndPassword(
    @Res({ passthrough: true }) response: Response,
    @Body() body: LoginBodyDto,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.login(body);

    response.cookie('accessToken', accessToken, AccessTokenCookieOptions);
    response.cookie('refreshToken', refreshToken, RefreshTokenCookieOptions);

    return user;
  }

  @Post('/refresh')
  @Auth('refreshToken')
  @ApiOperation({
    summary: 'Refresh access token',
  })
  @ApiCreatedResponse({
    description: 'Successful token refresh',
  })
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Ctx('userId') userId: number,
    @Cookie() cookies: AuthenticationCookiesType,
  ) {
    const { accessToken, refreshToken } = await this.authService.refresh(userId, cookies);

    response.cookie('accessToken', accessToken, AccessTokenCookieOptions);
    response.cookie('refreshToken', refreshToken, RefreshTokenCookieOptions);
  }
}
