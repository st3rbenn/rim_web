import {
  ParamListBase,
  StackNavigationState,
  TypedNavigator,
} from "@react-navigation/native";
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { NativeStackNavigatorProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { RootStackParamList } from "../../types";
import React from "react";
import TabNavigator from "./TabNavigator";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

interface Props {
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

function MainStack({ Stack }: Props) {
  return (
    <>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </>
  );
}

export default MainStack;
