import { ForbiddenException, Injectable } from '@nestjs/common';

import { ILike, In, Not, SelectQueryBuilder } from 'typeorm';

import { DatabaseService } from '@shared/database/services/database.service';

import { GroupEntity } from './entities/group.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { CreateGroupBodyDto } from './dtos/body/create-group.body-dto';

@Injectable()
export class GroupService extends DatabaseService {
  async createGroup(userId: number, body: CreateGroupBodyDto) {
    await this.database.groups.checkNotExists({ name: ILike(body.name) });

    const group = await this.database.groups.create({ userId, ...body });
    await this.database.userToGroups.create({ userId, groupId: group.id });
  }

  getUserToGroupsSubQuery(qb: SelectQueryBuilder<GroupEntity>, userId: number) {
    return qb
      .subQuery()
      .from(UserEntity, 'user')
      .where('user.id = :userId', { userId })
      .innerJoin('user.userToGroups', 'userToGroups')
      .select('userToGroups.group')
      .getQuery();
  }

  getUserGroups(userId: number) {
    return this.database.groups
      .createQueryBuilder('group')
      .where((qb) => `group.id IN ${this.getUserToGroupsSubQuery(qb, userId)}`)
      .getMany();
  }

  getOtherUserGroups(userId: number) {
    return this.database.groups
      .createQueryBuilder('group')
      .where((qb) => `group.id NOT IN ${this.getUserToGroupsSubQuery(qb, userId)}`)
      .getMany();
  }

  async getAllGroups(userId: number) {
    const myGroups = await this.getUserGroups(userId);
    const otherGroups = await this.getOtherUserGroups(userId);

    return { myGroups, otherGroups };
  }

  async getGroup(id: number, userId: number) {
    const group = await this.database.groups.findOneOrFail({
      where: { id },
      relations: {
        user: true,
        userToGroups: { user: true },
        messages: { user: true },
      },
      order: { messages: { createdAt: 'DESC' } },
    });
    const isMember = group.userToGroups!.some((item) => item.userId === userId);

    if (!isMember) throw new ForbiddenException('Access to group denied, join first');

    return group;
  }

  async joinGroup(groupId: number, userId: number) {
    await this.database.userToGroups.checkNotExists({ userId, groupId });

    await this.database.userToGroups.create({ groupId, userId });
  }

  async leaveGroup(groupId: number, userId: number) {
    const userOnGroup = await this.database.userToGroups.findOneOrFail({
      where: { userId, groupId },
    });

    await this.database.userToGroups.delete({ id: userOnGroup.id });
  }
}
