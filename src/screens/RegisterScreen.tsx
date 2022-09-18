import { StyleSheet, useColorScheme, ScrollView } from 'react-native';
import DatePickerIOS from '@react-native-community/datetimepicker';
import { Text, View } from '../components/Themed';
import { RootStackParamList, RootTabScreenProps } from '../../types';
import { Stack as MuiStack, TextInput, Flex, Button } from "@react-native-material/core";
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import { useAppThunkDispatch } from '../store';
import { register } from '../store/mainslice';
import { User } from '../models/user';
import { logger } from 'react-native-logs';

const log = logger.createLogger();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RegisterScreen({ navigation }: RootTabScreenProps<'RegisterScreen'>) {
  const colorScheme = useColorScheme();
  const [date, setDate] = useState<Date>(new Date())
  const [open, setOpen] = useState(false)

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date | undefined>();

  const dispatch = useAppThunkDispatch();

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

  const handleSend = async () => {
    if(password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    } else {
      try {
        const user: User = {
          email,
          password,
          pseudo,
          birthDate,
        }
        const res = await dispatch(register(user));
        // @ts-ignore
        if(res.meta.requestStatus === 'rejected') {
          alert("Une erreur est survenue");
        } else {
          navigation.navigate('LogInScreen');
        }
      } catch (error) {
        const err = error as AxiosError;
        // @ts-ignore
        console.error(err.response?.data?.message);
        throw error;
      }
    }
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.letterContainer}>
              <Text style={styles.letter_r}>R</Text>
              <Text style={styles.letter_i}>i</Text>
              <Text style={styles.letter_m}>M</Text>
            </View>
                <Text>Receive Instant Message</Text>
          </View>
        <StatusBar style="auto" />
        </View>
        <Flex fill style={styles.formContainer}>
            <MuiStack spacing={25} style={styles.inputContainer}>
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  variant='outlined'
                  placeholder='email'
                  textContentType='emailAddress'
                  onChange={(e) => setEmail(e.nativeEvent.text)}
                />
              </View>
              <View>
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput
                  variant='outlined'
                  placeholder='mot de passe'
                  textContentType='password'
                  secureTextEntry={true}
                  onChange={(e) => setPassword(e.nativeEvent.text)}
                />
              </View>
              <View>
                <Text style={styles.label}>Confirmer mot de passe</Text>
                <TextInput
                  variant='outlined'
                  placeholder='Confirmer mot de passe'
                  textContentType='newPassword'
                  secureTextEntry={true}
                  onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                />
              </View>
              <View>
                <Text style={styles.label}>Pseudo</Text>
                <TextInput
                  variant='outlined'
                  placeholder='Pseudo'
                  textContentType='nickname'
                  onChange={(e) => setPseudo(e.nativeEvent.text)}
                />
              </View>
              <View>
                <Text style={styles.label}>Date de naissance</Text>
                <DatePickerIOS
                  // @ts-ignore
                  date={date}
                  value={date as Date}
                  mode="date"
                  display="default"
                  onChange={(e, date) => {
                    if (date) {
                      setDate(date)
                      setBirthDate(date)
                    }
                  }}
                  style={{ width: '100%', padding: 15 }}
                />
              </View>
              <MuiStack>
                <Button title="S'inscrire" style={{ padding: 3 }} onPress={handleSend}></Button>
                <Text style={{ marginTop: 35 }}>Déjà inscrit ? <Text style={{ color: '#9141F8', marginTop: 75, marginBottom: 150 }} onPress={() => navigation.navigate('LogInScreen')}>Ce connecter</Text></Text>
              </MuiStack>
            </MuiStack>
        </Flex>
      </ScrollView>
    </>
  );
}