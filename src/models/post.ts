import {User} from './user';

export interface Post extends PostQuery {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

interface PostQuery {
  message?: string;
  posts?: Post[];
}
