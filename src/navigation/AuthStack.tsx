import React from 'react'
import LogInScreen from '../screens/LogInScreen';
import RegisterScreen from '../screens/RegisterScreen';

function AuthStack(Stack){
  return (
    <>
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </>
  )
}

export default AuthStack