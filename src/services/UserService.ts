import axios, {AxiosError} from 'axios';
// @ts-ignore
import {API_URL} from '@env';
import {User} from '../models/user';
import jwt_decode from 'jwt-decode';
import AuthMiddleware from './AuthHeader';

class UserService {
  async profile(): Promise<User> {
    try {
      const accessToken = await AuthMiddleware();
      const decoded: User = await jwt_decode(accessToken['Authorization'] as string);

      const response = await axios.get(`${API_URL}/user/${decoded.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken as any),
        },
      });

      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }

  async edit(user: User | FormData): Promise<User | FormData> {
    try {
      const accessToken = await AuthMiddleware();
      const decoded: User = await jwt_decode(accessToken['Authorization'] as string);

      const body = {
        userId: decoded.id,
        ...user,
      };

      const response = await axios.post(`${API_URL}/user/edit`, body, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken as any),
        },
      });

      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }

  async upload(file: FormData): Promise<any> {
    try {
      const accessToken = await AuthMiddleware();

      const response = await axios.post(`${API_URL}/upload`, file, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(accessToken as any),
        },
        transformRequest: (file: FormData) => {
          return file;
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default UserService;
