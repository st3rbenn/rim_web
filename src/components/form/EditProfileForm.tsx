import {StyleSheet, Text, TextInput as NativeInput, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {Avatar, Pressable, Stack} from '@react-native-material/core';
import {object, string} from 'yup';
import * as ImagePicker from 'expo-image-picker';
import {useSelector} from 'react-redux';
import {User} from '../../models/user';
import {useAppThunkDispatch} from '../../store';
import {updateProfile, uploadFile} from '../../store/mainslice';
import CustomErrorMessage from '../CustomErrorMessage';

interface Props {
  navigation: any;
  handleAccept: boolean;
}

function EditProfileForm({navigation, handleAccept}: Props) {
  const currentUser = useSelector((state: User) => state.user);
  const [avatar, setAvatar] = useState<string>(currentUser?.avatar);
  const [name, setName] = useState<string | undefined>(currentUser?.name);
  const [pseudo, setPseudo] = useState<string | undefined>(currentUser?.pseudo);
  const [biography, setBiography] = useState<string | undefined>(currentUser?.biography);

  const [selectedImage, setSelectedImage] = React.useState<ImagePicker.ImagePickerResult>();

  const dispatch = useAppThunkDispatch();

  const initialValues = {
    avatar: avatar,
    name: name,
    pseudo: pseudo,
    biography: biography,
  };

  const pickImage = async () => {
    console.log('pickImage');
    // No permissions request is necessary for launching the image library
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const t = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (t.granted) {
      const r = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!r.cancelled) {
        setSelectedImage(r);
        setAvatar(r.uri);
      }
    }
  };

  const handleSelectAvatar = async () => {
    await pickImage();
  };

  const handleSubmit = async () => {
    try {
      const user: User = {
        name: name,
        pseudo: pseudo,
        biography: biography,
        avatar: avatar,
      };

      if (currentUser?.pseudo === pseudo) {
        delete user.pseudo;
      }

      if (selectedImage) {
        const data = new FormData();
        data.append('file', {
          // @ts-ignore
          name: selectedImage.uri.split('/').pop(),
          // @ts-ignore
          type: selectedImage.type,
          // @ts-ignore
          uri: Platform.OS !== 'android' ? 'file://' + selectedImage.uri : selectedImage.uri,
        });

        const uploaded = await dispatch(uploadFile(data));

        if (uploaded.meta.requestStatus === 'fulfilled') {
          user.avatar = uploaded.payload.file;
        }
      }

      const res = await dispatch(updateProfile(user));

      if (res.meta.requestStatus === 'fulfilled') {
        navigation.navigate('ProfileTab');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (handleAccept) {
      handleSubmit();
      handleAccept = false;
    }
  }, [handleAccept]);

  useEffect(() => {
    const regex = new RegExp('^[a-zA-Z0-9_]*$');
    if (pseudo && !regex.test(pseudo)) {
      setPseudo(pseudo.replace(/[^a-zA-Z0-9_]/g, ''));
    }
  }, [pseudo]);

  useEffect(() => {
    if (name && name.length > 20) {
      setName(name.substring(0, 20));
    }
  }, [name]);

  const editProfileSchema = object({
    avatar: string(),
    pseudo: string()
      .required()
      .min(3, 'Le pseudo doit contenir au moins 3 caractères')
      .max(20, 'Le pseudo doit contenir au plus 20 caractères'),
    name: string()
      .required()
      .min(2, 'Le prénom doit contenir au moins 2 caractères')
      .max(20, 'Le prénom doit contenir au plus 20 caractères'),
    biography: string()
      .min(10, 'La biographie doit contenir au moins 10 caractères')
      .max(80, 'La biographie doit contenir au plus 80 caractères'),
  });

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={() => console.log('&')} validationSchema={editProfileSchema}>
        {({handleChange, handleBlur, values, errors, touched}) => (
          <Stack spacing={25}>
            <Pressable pressEffect="none" onPress={handleSelectAvatar}>
              <Stack spacing={10} style={{justifyContent: 'center', alignItems: 'center'}}>
                <Avatar
                  size={130}
                  image={{
                    uri: avatar ? avatar : 'https://picsum.photos/200',
                  }}
                />
                <Text style={styles.chooseAvatarText}>Modfier la photo de profil</Text>
                <CustomErrorMessage assingTo="avatar" errors={errors} touched={touched} />
              </Stack>
            </Pressable>
            <Stack style={{flexDirection: 'column'}}>
              <Text style={styles.label}>Nom</Text>
              <Stack style={styles.inputContainer}>
                <NativeInput
                  style={styles.input}
                  placeholder="Nom"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  onChange={(e) => setName(e.nativeEvent.text)}
                />
                <CustomErrorMessage assingTo="name" errors={errors} touched={touched} />
              </Stack>
            </Stack>
            <Stack style={{flexDirection: 'column'}}>
              <Text style={styles.label}>Pseudo</Text>
              <Stack style={styles.inputContainer}>
                <NativeInput
                  style={styles.input}
                  placeholder="Pseudo"
                  onChangeText={handleChange('pseudo')}
                  onBlur={handleBlur('pseudo')}
                  value={values.pseudo}
                  onChange={(e) => setPseudo(e.nativeEvent.text)}
                />
                <CustomErrorMessage assingTo="pseudo" errors={errors} touched={touched} />
              </Stack>
            </Stack>
            <Stack style={{flexDirection: 'column'}}>
              <Text style={styles.label}>Bio</Text>
              <Stack style={styles.inputContainer}>
                <NativeInput
                  style={{...styles.input}}
                  multiline={true}
                  placeholder="Décrit toi en quelques mots..."
                  onChangeText={handleChange('biography')}
                  onBlur={handleBlur('biography')}
                  value={values.biography}
                  onChange={(e) => setBiography(e.nativeEvent.text)}
                />
                <CustomErrorMessage assingTo="biography" errors={errors} touched={touched} />
              </Stack>
            </Stack>
          </Stack>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'stretch',
  },
  button: {
    backgroundColor: '#9141F8',
  },
  inputContainer: {},
  chooseAvatarText: {
    color: '#9141F8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    borderRadius: 15,
    height: 50,
    paddingLeft: 16,
  },
});

export default EditProfileForm;
