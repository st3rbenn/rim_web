import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { ColorSchemeName, Pressable } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Logo from "../components/Logo";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from 'react-redux';

function CustomHeader() {
  return (
    <Pressable style={{ flex: 0.9, alignItems: "center" }} onPress={() => {}}>
      <Logo />
    </Pressable>
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

function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const userData = useSelector((state: any) => state.user);

  const StackOptions = new Map();
  StackOptions.set("globalOptions", {
    headerLeft: () => <CustomHeader />,
    headerTitle: "",
    headerStyle: {
      backgroundColor: "hsla(0, 0%, 94%, 1)",
      shadowColor: "transparent",
    },
    headerBackground: () => (
      <Pressable style={{ flex: 1 }} onPress={() => {}} />
    ),
    animationTypeForReplace: "push",
    gestureEnabled: false,
  });

  return (
    <Stack.Navigator screenOptions={StackOptions.get("globalOptions")}>
      {!!userData && userData?.token ? (
        MainStack(Stack)
      ) : (
        AuthStack(Stack)
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
