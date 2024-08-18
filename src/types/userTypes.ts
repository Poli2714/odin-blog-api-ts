import { TBlogPost } from './bloPostTypes';
import { TComment } from './commentTypes';
import { TLike } from './likeTypes';

export type TUser = {
  id: number;
  created_at: Date;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  comments: TComment[];
  likes: TLike[];
  posts: TBlogPost[];
};
