import { NotFoundException } from '@nestjs/common';

import { capitalizeText } from '@shared/common/helpers';
import pluralize from 'pluralize';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { globalDashesRegex } from '@shared/common/constants';

export class DatabaseRepository<T extends object> {
  private readonly repository: Repository<T>;
  private readonly singlarTableName: string;
  private readonly pluralTableName: string;

  constructor(repository: Repository<T>) {
    this.repository = repository;
    this.singlarTableName = pluralize
      .singular(repository.metadata.tableName)
      .replace(globalDashesRegex, ' ');
    this.pluralTableName = pluralize
      .plural(repository.metadata.tableName)
      .replace(globalDashesRegex, ' ');
  }

  findOne(options: FindOneOptions<T>) {
    return this.repository.findOne(options);
  }

  async findOneOrFail(options: FindOneOptions<T>) {
    const document = await this.findOne(options);

    if (!document) {
      throw new NotFoundException(`${capitalizeText(this.singlarTableName)} not found`);
    }

    return document;
  }

  findAll(options?: FindManyOptions<T>) {
    return this.repository.find(options);
  }

  async findAllOrFail(options?: FindManyOptions<T>) {
    const documents = await this.findAll(options);

    if (!documents.length) {
      throw new NotFoundException(`No ${capitalizeText(this.pluralTableName)} found`);
    }

    return documents;
  }

  create(options: DeepPartial<T>) {
    const document = this.repository.create(options);

    return this.repository.save(document);
  }

  update(condition: FindOptionsWhere<T>, options: QueryDeepPartialEntity<T>) {
    return this.repository.update(condition, options);
  }

  delete(options: FindOptionsWhere<T>) {
    return this.repository.delete(options);
  }

  async checkNotExists(options: FindOptionsWhere<T>) {
    const document = await this.findOne({ where: options });

    if (document) {
      throw new NotFoundException(
        `${capitalizeText(this.singlarTableName)} with provided params already exists`,
      );
    }
  }

  createQueryBuilder(alias?: string) {
    return this.repository.createQueryBuilder(alias);
  }
}
