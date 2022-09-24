import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import HomeScreen from './HomeScreen';

type Props = {}

const Tab = createBottomTabNavigator();

const BottomTabNav = (props: Props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNav

const styles = StyleSheet.create({})