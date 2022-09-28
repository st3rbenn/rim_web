// @ts-ignore
import { REACT_APP_API_URL } from "@env";
import { User } from "../models/User";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from 'jwt-decode';
import AuthHeader from './AuthHeader';
import * as SecureStore from 'expo-secure-store';
const {getItem} = AsyncStorage;

class UserService {
  async profile(): Promise<User> {
    try {
      const accessToken = await AuthHeader();
      const decoded: User = await jwt_decode(accessToken["x-access-token"]);

      const options = {
        "Content-Type": "application/x-www-form-urlencoded",
        ...accessToken
      }

      const response = await axios.get(`${REACT_APP_API_URL}/user/${decoded.id}`, {
        method: "GET",
        headers: options,
      })
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async edit(user: User): Promise<User> {
    try {
      const accessToken = await AuthHeader();
      const decoded: User = await jwt_decode(accessToken["x-access-token"]);

      const options = {
        method: "POST",
        "Content-Type": "application/x-www-form-urlencoded",
        ...accessToken,
      }

      const body = {
        userId: decoded.id,
        ...user
      }

      const response = await axios.post(`${REACT_APP_API_URL}/user/edit`, {
        headers: options,
        ...body
      })
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default UserService;