import { Linking, StyleSheet, useColorScheme, Vibration, Animated, Modal, Pressable, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { Stack, TextInput, IconButton, Flex, Button } from "@react-native-material/core";
import { RootTabScreenProps } from '../../types';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useAppThunkDispatch } from '../store';
import { authentication } from '../store/mainslice';
import { User } from '../models/user';
import { AxiosError } from 'axios';
import { useRef, useEffect } from 'react';

export default function LogInScreen({ navigation }: RootTabScreenProps<'LogInScreen'>) {
  const dispatch = useAppThunkDispatch();
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [logMessage, setLogMessage] = useState<string>('');

  const r = useRef(new Animated.Value(0)).current
  const i = useRef(new Animated.Value(0)).current
  const m = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(r, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
    Animated.timing(i, {
      toValue: 1,
      duration: 2000,
      delay: 100,
      useNativeDriver: true
    }).start()
    Animated.timing(m, {
      toValue: 1,
      duration: 3000,
      delay: 200,
      useNativeDriver: true
    }).start()
  }, [r, i, m])


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
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'transparent'
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

  const handleSubmit = async () => {
    try {
      const user: User = {
        email,
        password,
      };

      const res = await dispatch(authentication(user));
      if(res.meta.requestStatus === 'fulfilled') {
        Vibration.vibrate();
        setLogMessage('Log in successful!');
        setIsAuthenticating(true);
        setModalVisible(true);
      } else {
        console.log(res);
        setLogMessage('an error occured');
        setModalVisible(true);
      }
    } catch (error) {
      const err = error as AxiosError;
      // @ts-ignore
      console.error(err.response?.data?.message);
      throw error;
    }
  }

  return (
    <>
      <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.letterContainer}>
          <Animated.View 
            style={{
              opacity: r,
            }}>
            <Text style={styles.letter_r}>R</Text>
          </Animated.View>
          <Animated.View 
            style={{
              opacity: i,
            }}>
            <Text style={styles.letter_i}>i</Text>
          </Animated.View>
          <Animated.View 
            style={{
              opacity: m,
            }}>
              <Text style={styles.letter_m}>M</Text>
          </Animated.View>
        </View>
          <Animated.View 
            style={{
              opacity: i,
            }}>
            <Text>Receive Instant Message</Text>
          </Animated.View>
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
              secureTextEntry={true}
              onChange={(e) => setPassword(e.nativeEvent.text)}
            />
          </View>
          <Stack>
            <Button title='Ce connecter' style={{ padding: 3 }} onPress={handleSubmit}></Button>
            <Text style={{ marginTop: 35 }}>Pas encore inscrit ? <Text style={{ color: '#9141F8', marginTop: 75 }} onPress={() => navigation.navigate('RegisterScreen')}>S'inscrire</Text></Text>
          </Stack>
        </Stack>
        <StatusBar style="auto" />
      </Flex>
      {
        isAuthenticating && (
          <>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{logMessage}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Fermer</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </>
        )
      }
    </>
  );
}