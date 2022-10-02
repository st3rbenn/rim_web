export interface User extends UserQuery {
  token?: string;
  id?: string;
  email?: string;
  pseudo?: string;
  name?: string;
  password?: string;
  biography?: string;
  avatar?: any;
  birthDate?: Date;
  nbFollowers?: number;
  nbFollowed?: number;
  exp?: number;
}

interface UserQuery {
  message?: string;
  user?: User;
}

export type UserState = User;
