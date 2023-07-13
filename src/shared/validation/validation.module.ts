import { Module } from '@nestjs/common';

import { ValidationService } from './validation.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ValidationService],
  exports: [ValidationService],
})
export class ValidationModule {}
