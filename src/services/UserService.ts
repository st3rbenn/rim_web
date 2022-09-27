// @ts-ignore
import { REACT_APP_API_URL } from "@env";
import { User } from "../models/User";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from 'jwt-decode';
import AuthHeader from './AuthHeader';

const {getItem} = AsyncStorage;

class UserService {
  async profile(): Promise<User> {
    try {
      const token = await getItem('token');
      const decoded: User = await jwt_decode(token);
      
      const accessToken = await AuthHeader();

      const response = await axios.get(`${REACT_APP_API_URL}/user/${decoded.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...accessToken
        },
      })
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default UserService;