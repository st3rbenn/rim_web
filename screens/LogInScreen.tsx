import { Linking, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';
import { Stack, TextInput, IconButton, Flex, Button } from "@react-native-material/core";
import { RootTabScreenProps } from '../types';
import { StatusBar } from 'expo-status-bar';

export default function LogInScreen({ navigation }: RootTabScreenProps<'LogInScreen'>) {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      alignItems: 'center',
    },
    letterContainer: {
      flexDirection: 'row',
    },
    letter_r: {
      fontSize: 125,
      fontWeight: 'bold',
      color: '#9141F8',
      marginRight: 5,
      transform: [{ rotate: '-20deg' }],
    },
    letter_i: {
      fontSize: 100,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
    },
    letter_m: {
      fontSize: 125,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      transform: [{ rotate: '15deg' }],
    },
    logoContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    inputContainer: {
      margin: 16,
    },
    label: {
      marginBottom: 8,
      fontSize: 16,
    }
  });

  return (
    <>
      <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.letterContainer}>
          <Text style={styles.letter_r}>R</Text>
          <Text style={styles.letter_i}>i</Text>
          <Text style={styles.letter_m}>M</Text>
        </View>
          <Text>Receive Instant Message</Text>
        </View>
      </View>
      <Flex fill style={styles.formContainer}>
        <Stack spacing={25} style={styles.inputContainer}>
          <View>
            <Text style={styles.label}>email</Text>
            <TextInput variant='outlined' placeholder='email' />
          </View>
          <View>
            <Text style={styles.label}>mot de passe</Text>
            <TextInput variant='outlined' placeholder='mot de passe' />
          </View>
          <Stack>
            <Button title='Ce connecter' style={{ padding: 3 }}></Button>
            <Text style={{ marginTop: 35 }}>Pas encore inscrit ? <Text style={{ color: '#9141F8', marginTop: 75 }} onPress={() => navigation.navigate('RegisterScreen')}>S'inscrire</Text></Text>
          </Stack>
        </Stack>
        <StatusBar style="auto" />
      </Flex>
    </>
  );
}