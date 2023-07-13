import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { Environment } from '@shared/variables/environment';

export const globalDashesRegex = /\-/g;
export const globalCorsOptions: CorsOptions = {
  credentials: true,
  origin: Environment.ALLOWED_ORIGINS === '*' ? '*' : Environment.ALLOWED_ORIGINS.split(';'),
};
