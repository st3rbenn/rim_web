import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer, ParamListBase, StackNavigationState, TypedNavigator} from '@react-navigation/native'
import { NativeStackNavigationOptions, NativeStackNavigationEventMap } from '@react-navigation/native-stack';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from '../../../types';
import { Stack } from '@react-native-material/core';


function EditProfileScreen() {
  return (
    <Stack>
      <Text>EditProfileScreen</Text>
    </Stack>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({})