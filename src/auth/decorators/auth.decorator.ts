import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiConflictResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';

import { TokenType } from '../types';

export const Auth = (tokenType: TokenType = 'accessToken') => {
  return applyDecorators(
    UseGuards(AuthGuard(tokenType)),
    ApiUnauthorizedResponse({
      description: 'Token is not provided or is not valid',
    }),
    ApiConflictResponse({
      description: 'Access token is still valid, refusing to create new one',
    }),
  );
};
