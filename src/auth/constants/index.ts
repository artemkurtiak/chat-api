import { CookieOptions } from 'express';

import { Environment } from '@shared/variables/environment';

const DefaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: Environment.NODE_ENV === 'PROD',
};

export const AccessTokenCookieOptions: CookieOptions = {
  ...DefaultCookieOptions,
  maxAge: Environment.ACCESS_JWT_EXPIRES_IN * 1000,
};
export const RefreshTokenCookieOptions: CookieOptions = {
  ...DefaultCookieOptions,
  maxAge: Environment.REFRESH_JWT_EXPIRES_IN * 1000,
};
