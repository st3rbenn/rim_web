import AsyncStorage from '@react-native-async-storage/async-storage';

const {getItem} = AsyncStorage;

export default async function AuthMiddleware() {
  const token = await getItem('token');

  //if token return barrer token pattern else return empty object
  if (token) {
    return {Authorization: 'Bearer ' + token};
  } else {
    return {};
  }
}
