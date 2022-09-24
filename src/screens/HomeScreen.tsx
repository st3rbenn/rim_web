import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@react-native-material/core'
import { useAppThunkDispatch } from "../store";
import { logOut } from '../store/mainslice';

const HomeScreen = () => {

  const dispatch = useAppThunkDispatch();

  const handleDisconnect = () => {
    dispatch(logOut());
  }


  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='disconnect' onPress={handleDisconnect}></Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})