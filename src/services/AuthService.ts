// @ts-ignore
import { REACT_APP_API_URL } from "@env";
import { User } from "../models/User";
import axios, { AxiosResponse } from "axios";
import * as SecureStore from 'expo-secure-store';
const { deleteItemAsync, setItemAsync } = SecureStore;

class AuthService {
  async register(user: User): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        ...user,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async authenticate(user: User) {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        ...user,
      });

      await setItemAsync("token", response.data.token);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logOut() {
    return await deleteItemAsync("token");
  }
}

export default AuthService;
