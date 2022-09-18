// @ts-ignore
import { REACT_APP_API_URL } from '@env';
import { User } from '../models/User';
import axios, { AxiosResponse } from 'axios';

export class UserSerice {
  async register(user: User): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...user
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async authenticate(user: User): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...user
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}