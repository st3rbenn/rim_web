import {Post} from './post';

export interface User extends UserQuery {
  token?: string;
  id?: string;
  email?: string;
  pseudo?: string;
  name?: string;
  password?: string;
  biography?: string;
  avatar?: string;
  birthDate?: Date;
  nbFollowers?: number;
  nbFollowed?: number;
  exp?: number;
  posts: Post[];
}

interface UserQuery {
  message?: string;
  user?: User;
}

export type UserState = User;
