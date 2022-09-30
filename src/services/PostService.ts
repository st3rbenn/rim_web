// @ts-ignore
import { REACT_APP_API_URL } from "@env";
import { Post } from "../models/post";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AuthMiddleware from "./AuthHeader";
import { User } from "../models/user";

class PostService {
  async getUserPosts(): Promise<Post[]> {
    try {
      const accessToken = await AuthMiddleware();
      const decoded: User = await jwt_decode(accessToken["Authorization"]);

      const response = await axios.get(`${REACT_APP_API_URL}/post/user/${decoded.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...accessToken,
        },
      });
      
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default PostService;