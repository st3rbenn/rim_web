import {User} from '../models/user';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import {API_URL} from '@env';

const {setItem, removeItem} = AsyncStorage;

class AuthService {
  async register(user: User): Promise<Pick<User, 'token'>> {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
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
      const response = await axios.post(`${API_URL}/auth/login`, {
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
