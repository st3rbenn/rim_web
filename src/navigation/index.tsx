import {NavigationContainer, DarkTheme, createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ColorSchemeName, Pressable} from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import CustomHeader from '../components/CustomHeader';
import {useEffect, useState} from 'react';

export const navigationRef = createNavigationContainerRef();

interface rootProps {
  routeName?: string;
}

function RootNavigator({routeName}: rootProps) {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const tokenAuth = useSelector((state: any) => state.userToken);
  const userData = useSelector((state: RootState) => state.user);

  return (
    <Stack.Navigator
      screenOptions={
        !tokenAuth
          ? {
              header: () => <CustomHeader title={routeName} />,
              headerStyle: {
                backgroundColor: 'hsla(0, 0%, 94%, 1)',
              },
              headerShadowVisible: false,
              animationTypeForReplace: 'push',
              headerTitle: '',
              gestureEnabled: false,
            }
          : {headerShown: false}
      }>
      {!!tokenAuth && tokenAuth ? MainStack({Stack}) : AuthStack({Stack})}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}} />
    </Stack.Navigator>
  );
}

export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  const [routeName, setRouteName] = useState<string>();

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
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={navigationRef}
      onReady={() => {
        setRouteName(navigationRef.getCurrentRoute()?.name);
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef.getCurrentRoute()?.name;
        setRouteName(currentRouteName);
      }}>
      <RootNavigator routeName={routeName} />
    </NavigationContainer>
  );
}
