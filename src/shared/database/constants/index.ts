import { DatabaseEntitiesType } from '../types';

export const databaseTables: Record<keyof DatabaseEntitiesType, string> = <const>{
  users: 'users',
  accessTokens: 'accessTokens',
  refreshTokens: 'refreshTokens',
  groups: 'groups',
  userToGroups: 'userToGroups',
  messages: 'messages',
};
