import { z } from 'zod';

import { EnvironmentSchema } from '../schemas/environment.schema';

export type EnvironmentType = z.infer<typeof EnvironmentSchema>;
