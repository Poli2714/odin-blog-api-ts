import { TComment } from './commentTypes';
import { TLike } from './likeTypes';
import { TUser } from './userTypes';

export type TBlogPost = {
  id: number;
  content: string;
  created_at: Date;
  published_at: Date | null;
  slug: string;
  title: string;
  updated_at: Date;
  author: Pick<TUser, 'first_name' | 'last_name' | 'username'>;
  comments: Array<TComment>;
  likes: Array<TLike>;
};

export type TNewOrEditedBlogPost = Pick<TBlogPost, 'content' | 'title'>;

export type TDraftBlogPost = Partial<TNewOrEditedBlogPost>;
