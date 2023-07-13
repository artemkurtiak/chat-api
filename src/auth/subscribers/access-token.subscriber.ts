import { sign } from 'jsonwebtoken';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

import { Environment } from '@shared/variables/environment';

import { AccessTokenEntity } from '../entities/access-token.entity';

@EventSubscriber()
export class AccessTokenSubscriber implements EntitySubscriberInterface<AccessTokenEntity> {
  listenTo() {
    return AccessTokenEntity;
  }

  async beforeInsert(event: InsertEvent<AccessTokenEntity>) {
    const token = await sign({ userId: event.entity.userId }, Environment.ACCESS_JWT_SECRET, {
      expiresIn: Environment.ACCESS_JWT_EXPIRES_IN,
    });

    event.entity.token = token;
  }
}
