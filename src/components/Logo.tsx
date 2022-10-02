import {Text, View} from '../components/Themed';
import {StyleSheet, useColorScheme} from 'react-native';

export default function Logo() {
  const colorScheme = useColorScheme();

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
    <View style={styles.logoContainer}>
      <View style={styles.letterContainer}>
        <Text style={styles.letterR}>R</Text>
        <Text style={styles.letterI}>i</Text>
        <Text style={styles.letterM}>M</Text>
      </View>
    </View>
  );
}
