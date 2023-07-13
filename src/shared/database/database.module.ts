import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeormDataSource from 'typeorm.datasource';

@Module({
  imports: [TypeOrmModule.forRoot(typeormDataSource.options)],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
