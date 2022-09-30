// @ts-ignore
import { REACT_APP_API_URL } from "@env";
import { User } from "../models/User";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import AuthMiddleware from "./AuthHeader";
const { getItem } = AsyncStorage;

class UserService {
  async profile(): Promise<User> {
    try {
      const accessToken = await AuthMiddleware();
      const decoded: User = await jwt_decode(accessToken["Authorization"]);

      const response = await axios.get(
        `${REACT_APP_API_URL}/user/${decoded.id}`,
        {
          method: "GET",
          headers: accessToken,
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async edit(user: User): Promise<User> {
    try {
      const accessToken = await AuthMiddleware();
      const decoded: User = await jwt_decode(accessToken["Authorization"]);

      const body = {
        userId: decoded.id,
        ...user,
      };

      const response = await axios.post(
        `${REACT_APP_API_URL}/user/edit`,
        body,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...accessToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async upload(file: FormData): Promise<any> {
    try {
      const accessToken = await AuthMiddleware();

      const response = await axios.post(`${REACT_APP_API_URL}/upload`, file, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          ...accessToken,
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
