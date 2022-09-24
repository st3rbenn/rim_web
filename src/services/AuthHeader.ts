import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import { REACT_APP_API_URL } from '@env';
import axios, { AxiosResponse } from 'axios';

const { getItem } = AsyncStorage;

export default function AuthHeader(){
  const token = getItem('token');
  if(token){
    return { 'x-access-token': token };
  } else {
    return {};
  }
}