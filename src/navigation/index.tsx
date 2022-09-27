import { NavigationContainer, DarkTheme, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorSchemeName, Pressable } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Logo from "../components/Logo";
import CustomHeader from "../components/CustomHeader";

function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const tokenAuth = useSelector((state: any) => state.userToken);
  const userData = useSelector((state: RootState) => state.user);

  return (
    <Stack.Navigator screenOptions={!tokenAuth ? {
      headerLeft: () => <CustomHeader />,
      headerStyle: {
        backgroundColor: "hsla(0, 0%, 94%, 1)",
      },
      headerBackground: () => (
        <Pressable style={{ flex: 1 }} onPress={() => {}} />
      ),
      headerShadowVisible: false,
      animationTypeForReplace: "push",
      headerTitle: '',
      gestureEnabled: false,
      headerShown: true,
    } : {headerShown: false}}>
      {!!tokenAuth && tokenAuth?.token
        ? MainStack({ Stack })
        : AuthStack({ Stack })}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const DefaultTheme = {
    dark: false,
    colors: {
      primary: "rgb(255, 45, 85)",
      background: "hsla(0, 0%, 94%, 1)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
    },
  };
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
