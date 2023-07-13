import { hash } from 'bcryptjs';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

import { Environment } from '@shared/variables/environment';

import { UserEntity } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>) {
    const { password } = event.entity;

    event.entity.password = await hash(password, Environment.BCRYPT_SALT);
  }
}
