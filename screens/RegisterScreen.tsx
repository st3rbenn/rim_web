import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Stack, TextInput, Flex, Button } from "@react-native-material/core";
import DatePicker from 'react-native-date-picker'
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function RegisterScreen({ navigation }: RootTabScreenProps<'RegisterScreen'>) {
  const colorScheme = useColorScheme();
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date>();

  const styles = StyleSheet.create({
    container: {
      flex: 0.3,
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
      marginTop: 55,
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
  })

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
          <TextInput
            variant='outlined'
            placeholder='email'
            onChange={(e) => setEmail(e.nativeEvent.text)}
          />
        </View>
        <View>
          <Text style={styles.label}>mot de passe</Text>
          <TextInput
            variant='outlined'
            placeholder='mot de passe'
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Pseudo</Text>
          <TextInput
            variant='outlined'
            placeholder='Pseudo'
            onChange={(e) => setPseudo(e.nativeEvent.text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Date de naissance</Text>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode='date'
            androidVariant='nativeAndroid'
            textColor={colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
            fadeToColor={colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
            style={{ width: '100%' }}
          />
        </View>
        <Stack>
          <Button title="S'inscrire" style={{ padding: 3 }}></Button>
          <Text style={{ marginTop: 35 }}>Déjà inscrit ? <Text style={{ color: '#9141F8', marginTop: 75 }} onPress={() => navigation.navigate('LogInScreen')}>Ce connecter</Text></Text>
        </Stack>
      </Stack>
      <StatusBar style="auto" />
    </Flex>
    </>
  );
}