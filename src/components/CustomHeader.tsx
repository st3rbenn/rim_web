import {Button, Pressable, Stack, Text} from '@react-native-material/core';
import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import Logo from './Logo';
import {Feather, Ionicons} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface CustomHeaderProps {
  title?: string;
  setAccept: Dispatch<SetStateAction<boolean>>;
  isProfileSettingsModalOpen?: boolean;
  setIsProfileSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CustomHeader(props: CustomHeaderProps) {
  const {title, setAccept, isProfileSettingsModalOpen, setIsProfileSettingsModalOpen} = props;
  const userData = useSelector((state: RootState) => state.user);
  const loadingUser = useSelector((state: RootState) => state.loadingUser);
  const tokenAuth = useSelector((state: any) => state.userToken);
  const [titleToDisplay, setTitleToDisplay] = useState<string | undefined>('');
  const [isProfileTab, setIsProfileTab] = useState<boolean>(false);
  const [isEditProfileTab, setIsEditProfileTab] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (title === userData?.name) {
      setTitleToDisplay(userData?.name);
      setIsProfileTab(true);
    } else if (title === 'HomeTab') {
      setTitleToDisplay('');
    } else if (title === 'SearchTab') {
      setTitleToDisplay('Rechercher');
    } else if (title === 'NotificationTab') {
      setTitleToDisplay('Notifications');
    } else if (title === 'EditProfile') {
      setTitleToDisplay('Modification');
      setIsEditProfileTab(true);
    } else {
      setTitleToDisplay('');
    }

    return () => {
      setTitleToDisplay('');
      setIsProfileTab(false);
      setIsEditProfileTab(false);
    };
  }, [title]);

  const styles = StyleSheet.create({
    // @ts-ignore
    container: tokenAuth
      ? {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: isProfileTab ? 'space-between' : null,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 35,
          height: 100,
        }
      : {
          alignItems: 'center',
          justifyContent: 'center',
          height: 100,
          paddingTop: 50,
          backgroundColor: 'hsla(0, 0%, 94%, 1)',
        },
    Heading: {
      fontSize: 17,
      fontWeight: 'bold',
      alignItems: 'center',
      marginRight: !isEditProfileTab ? 50 : undefined,
      marginLeft: isEditProfileTab ? 70 : undefined,
    },
    editProfilContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
  });

  const handleProfileSettingsModal = () => {
    setIsProfileSettingsModalOpen(!isProfileSettingsModalOpen);
  };

  const handlePressFinishEdit = () => {
    setAccept(true);
  };

  return (
    <Stack style={styles.container}>
      {!isEditProfileTab && (
        <>
          <Logo />
          <Text style={styles.Heading}>{titleToDisplay}</Text>
          {isProfileTab && (
            <Pressable onPress={handleProfileSettingsModal} pressEffect="none">
              <Feather name="menu" size={23} />
            </Pressable>
          )}
        </>
      )}
      {isEditProfileTab && (
        <Stack style={styles.editProfilContainer}>
          <Pressable onPress={() => navigation.navigate('ProfileTab')} pressEffect="none">
            <Ionicons name="ios-arrow-back" size={23} />
          </Pressable>
          <Text style={styles.Heading}>{titleToDisplay}</Text>
          <Button
            title="Terminé"
            loading={loadingUser}
            loadingIndicatorPosition="overlay"
            variant="text"
            color="#9141F8"
            uppercase={false}
            pressEffect="none"
            onPress={handlePressFinishEdit}></Button>
        </Stack>
      )}
    </Stack>
  );
}
