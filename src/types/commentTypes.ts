import { TUser } from './userTypes';

export type TComment = {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  author: Pick<TUser, 'first_name' | 'last_name' | 'role' | 'username'>;
};
