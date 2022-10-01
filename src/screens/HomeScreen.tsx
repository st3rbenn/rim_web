import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Stack} from '@react-native-material/core';
import {useAppThunkDispatch} from '../store';
import {init} from '../store/mainslice';
import {useSelector} from 'react-redux';
import {Post} from '../models/post';

function HomeScreen() {
  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <Stack>
      <Text>HomeScreen</Text>
    </Stack>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
