import {User} from '../models/user';
import axios, {AxiosResponse, AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as dotenv from 'dotenv';

dotenv.config();

const {setItem, removeItem} = AsyncStorage;

class AuthService {
  async register(user: User): Promise<Pick<User, 'token'>> {
    try {
      const response = await axios.post(`${process.env.API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...user,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async authenticate(user: User) {
    try {
      const response = await axios.post(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...user,
      });

      await setItem('token', response.data.token);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logOut() {
    return await removeItem('token');
  }
}

export default AuthService;
