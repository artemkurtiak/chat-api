import { Type } from '@nestjs/common';

export type AuthenticationContext = { userId: number };
export type TokenType = 'accessToken' | 'refreshToken';
export type AuthGuardReturnType<AsMixin extends boolean> = AsMixin extends true ? Type<any> : null;
