import {Text, View} from '../components/Themed';
import {Animated, StyleSheet, useColorScheme, SafeAreaView} from 'react-native';
import {useRef, useEffect} from 'react';

export default function Logo() {
  const colorScheme = useColorScheme();
  const floatingAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [floatingAnimation]);

  const styles = StyleSheet.create({
    logoContainer: {
      backgroundColor: 'transparent',
      justifyContent: 'flex-start',
    },
    letterContainer: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
    },
    letterR: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#9141F8',
      marginRight: 5,
      transform: [{rotate: '-20deg'}, {translateY: 0}],
    },
    letterI: {
      fontSize: 25,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      transform: [{translateY: 0}],
    },
    letterM: {
      fontSize: 40,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      transform: [{rotate: '15deg'}, {translateY: 0}],
    },
  });

  return (
    <SafeAreaView style={styles.logoContainer}>
      <View style={styles.letterContainer}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: floatingAnimation.interpolate({
                  inputRange: [0, 3],
                  outputRange: [0, -10],
                }),
              },
            ],
          }}>
          <Text style={styles.letterR}>R</Text>
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              {
                translateY: floatingAnimation.interpolate({
                  inputRange: [0, 4],
                  outputRange: [0, -10],
                }),
              },
            ],
          }}>
          <Text style={styles.letterI}>i</Text>
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              {
                translateY: floatingAnimation.interpolate({
                  inputRange: [0, 5],
                  outputRange: [0, -30],
                }),
              },
            ],
          }}>
          <Text style={styles.letterM}>M</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
