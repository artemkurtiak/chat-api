import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { databaseTables } from '../constants';

import { DatabaseRepository } from '../repositories/database.repository';
import { DatabaseRepositories } from '../types';

export class DatabaseService {
  database: DatabaseRepositories;

  constructor(@InjectDataSource() dataSource: DataSource) {
    const database = Object.entries(databaseTables).reduce((acc, [key, name]) => {
      const entityMetadata = dataSource.entityMetadatas.find((item) => item.tableName === name);

      if (entityMetadata) {
        acc[key] = new DatabaseRepository(dataSource.getRepository(entityMetadata.name));
      }

      return acc;
    }, {} as DatabaseRepositories);

    this.database = database;
  }
}
