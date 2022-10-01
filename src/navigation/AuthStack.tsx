import React from 'react';
import LogInScreen from '../screens/LogInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {ParamListBase, StackNavigationState, TypedNavigator} from '@react-navigation/native';
import {NativeStackNavigationEventMap, NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {NativeStackNavigatorProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../../types';
interface props {
  Stack: TypedNavigator<
    RootStackParamList,
    StackNavigationState<ParamListBase>,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap,
    ({
      id,
      initialRouteName,
      children,
      screenListeners,
      screenOptions,
      ...rest
    }: NativeStackNavigatorProps) => React.ReactElement | null
  >;
}

function AuthStack({Stack}: props) {
  return (
    <>
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </>
  );
}

export default AuthStack;
