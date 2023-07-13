import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class UserService extends DatabaseService {
  getMe(userId: number) {
    return this.database.users.findOne({
      where: { id: userId },
      relations: { userToGroups: true },
    });
  }
}
