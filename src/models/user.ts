export interface User {
  id?: string;
  email: string;
  password: string;
  pseudo: string;
  birthDate?: Date;
  error?: string;
}