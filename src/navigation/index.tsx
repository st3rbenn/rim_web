import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import LogInScreen from '../screens/LogInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import Logo from '../components/Logo';

function CustomHeader() {
  return (
    <Pressable style={{ flex: 0.9, alignItems: 'center', marginTop: 20 }} onPress={() => { }}>
      <Logo />
    </Pressable>
  )
}



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const DefaultTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'hsla(0, 0%, 94%, 1)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={() => {
      return {
        headerLeft: () => <CustomHeader />,
        headerTitle: '',
        headerStyle: {
          backgroundColor: 'hsla(0, 0%, 94%, 1)',
          shadowColor: 'transparent',
        },
        headerBackground: () => <Pressable style={{ flex: 1 }} onPress={() => { }} />,
        animation: 'none',
        animationTypeForReplace: 'pop',
        gestureEnabled: false
      }
    }}>
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}