import { sign } from 'jsonwebtoken';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

import { Environment } from '@shared/variables/environment';

import { RefreshTokenEntity } from '../entities/refresh-token.entity';

@EventSubscriber()
export class AccessTokenSubscriber implements EntitySubscriberInterface<RefreshTokenEntity> {
  listenTo() {
    return RefreshTokenEntity;
  }

  async beforeInsert(event: InsertEvent<RefreshTokenEntity>) {
    const token = sign({ userId: event.entity.userId }, Environment.REFRESH_JWT_SECRET, {
      expiresIn: Environment.REFRESH_JWT_EXPIRES_IN,
    });

    event.entity.token = token;
  }
}
