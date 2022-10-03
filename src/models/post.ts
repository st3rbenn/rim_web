import {User} from './user';

export interface Post extends PostQuery {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: Date;
  user: User;
}

export interface PostQuery {
  message?: string;
  posts?: Post[];
}
