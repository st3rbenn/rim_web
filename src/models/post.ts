import { User } from "./user";

export interface Post {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}