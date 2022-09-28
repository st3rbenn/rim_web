import AsyncStorage from '@react-native-async-storage/async-storage';

const { getItem } = AsyncStorage;

export default async function AuthHeader(){
  const token = await getItem('token');
  if(token){
    return { 'x-access-token': token };
  } else {
    console.log('no token');
  }
}