import {StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {Text} from '../components/Themed';
import {RootTabScreenProps} from '../../types';
import {StatusBar} from 'expo-status-bar';
import LogInForm from '../components/form/LogInForm';
import {Stack} from '@react-native-material/core';

export default function LogInScreen({navigation}: RootTabScreenProps<'LogInScreen'>) {
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Stack style={styles.container} spacing={50}>
          <Stack style={styles.infoBox} spacing={10}>
            <Text style={styles.heading}>Connexion</Text>
            <Text style={styles.subText}>Connectez-vous à votre compte pour accéder à vos données</Text>
          </Stack>
          {/* @ts-ignore */}
          <LogInForm navigation={navigation} />
        </Stack>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 100,
    marginTop: 20,
  },
  infoBox: {
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666666',
  },
});
