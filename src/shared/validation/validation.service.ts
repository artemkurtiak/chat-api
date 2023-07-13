import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ValidationService {
  // validate data using zod schema
  static validateWithZod<T>(schema: Zod.Schema<T>, data: unknown): T | void {
    const result = schema.safeParse(data);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        const [field = ''] = error.path;

        Logger.error(`${field}(${error.message})`, ValidationService.name);
      });

      process.exit(0);
    }

    return result.data;
  }
}
