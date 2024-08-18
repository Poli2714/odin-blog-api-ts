import { TUser } from './userTypes';

export type TLike = {
  id: number;
  user: Pick<TUser, 'id' | 'first_name' | 'last_name' | 'username'>;
};
