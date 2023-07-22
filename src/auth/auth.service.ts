import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthenticationCookiesType } from '@shared/common/types';
import { compare } from 'bcryptjs';

import { DatabaseService } from '@shared/database/services/database.service';

import { LoginBodyDto } from './dtos/body/login.body-dto';
import { SignUpBodyDto } from './dtos/body/sign-up.body-dto';

@Injectable()
export class AuthService extends DatabaseService {
  // sign up new user
  async signUp(body: SignUpBodyDto) {
    await this.database.users.checkNotExists({ email: body.email });

    const user = await this.database.users.create(body);
    const accessToken = await this.database.accessTokens.create({ userId: user.id });
    const refreshToken = await this.database.refreshTokens.create({
      userId: user.id,
      accessTokenId: accessToken.id,
    });

    return { user, accessToken: accessToken.token, refreshToken: refreshToken.token };
  }

  // login
  async login(body: LoginBodyDto) {
    const user = await this.database.users.findOneOrFail({ where: { email: body.email } });

    const isPasswordMatched = await compare(body.password, user.password);

    if (!isPasswordMatched) throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.database.accessTokens.create({ userId: user.id });
    const refreshToken = await this.database.refreshTokens.create({
      userId: user.id,
      accessTokenId: accessToken.id,
    });

    return { user, accessToken: accessToken.token, refreshToken: refreshToken.token };
  }

  // refresh access token
  async refresh(userId: number, cookies: AuthenticationCookiesType) {
    await Promise.all([
      this.database.accessTokens.delete({ token: cookies.accessToken }),
      this.database.refreshTokens.delete({ token: cookies.refreshToken }),
    ]);
    const accessToken = await this.database.accessTokens.create({ userId });
    const refreshToken = await this.database.refreshTokens.create({
      userId,
      accessTokenId: accessToken.id,
    });

    return {
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
    };
  }
}
