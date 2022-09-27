export interface User extends UserQuery {
  id?: string;
  email: string;
  pseudo?: string;
  firstName?: string;
  password?: string;
  biography?: string;
  avatar?: string;
  birthDate?: Date;
  nbFollowers?: number;
  nbFollowed?: number;
}

interface UserQuery {
  message: string,
  user: User
};