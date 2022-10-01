import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppThunkDispatch} from '../store';

function NotificationScreen() {
  const dispatch = useAppThunkDispatch();

  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({});
