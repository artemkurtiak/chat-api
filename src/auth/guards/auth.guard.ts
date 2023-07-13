import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';

import { decode } from 'jsonwebtoken';

import { DatabaseService } from '@shared/database/services/database.service';

import { TokenType } from '../types';

export const AuthGuard = (type: TokenType = 'accessToken') => {
  class AuthGuardMixin extends DatabaseService implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.cookies[type];

      if (!token) throw new UnauthorizedException('Token is not provided or is not valid');

      if (type === 'refreshToken' && request.cookies.accessToken) {
        throw new ConflictException('Access token is still valid, refusing to create new one');
      }

      const tokenPayload = decode(token);

      if (!tokenPayload || !(tokenPayload instanceof Object)) {
        throw new UnauthorizedException('Token is not provided or is not valid');
      }

      request.ctx = tokenPayload;

      return true;
    }
  }

  return mixin(AuthGuardMixin);
};
