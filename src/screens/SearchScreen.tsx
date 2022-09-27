import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppThunkDispatch } from "../store";

function SearchScreen() {
  const dispatch = useAppThunkDispatch();

  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})