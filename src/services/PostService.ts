import {Post} from '../models/post';
import axios, {AxiosError} from 'axios';
import jwt_decode from 'jwt-decode';
import AuthMiddleware from './AuthHeader';
import {User} from '../models/user';
import * as dotenv from 'dotenv';

dotenv.config();

class PostService {
  async getUserPosts(): Promise<Post[]> {
    try {
      const accessToken = await AuthMiddleware();
      const decoded: User = await jwt_decode(accessToken['Authorization'] as string);

      const response = await axios.get(`${process.env.API_URL}/post/user/${decoded.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...(accessToken as any),
        },
      });

      return response.data;
    } catch (error) {
      return error as any;
    }
  }
}

export default PostService;
