import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import { ValidationService } from '@shared/validation/validation.service';

import { EnvironmentType } from './types';

import { EnvironmentSchema } from './schemas/environment.schema';

const expanded = dotenvExpand.expand(dotenv.config()).parsed;

export const Environment = ValidationService.validateWithZod(
  EnvironmentSchema,
  expanded,
) as EnvironmentType;
