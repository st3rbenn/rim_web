import {StyleSheet, ScrollView, RefreshControl, Animated, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Stack, Avatar, Text, FAB, Pressable} from '@react-native-material/core';
import {RootState, useAppThunkDispatch} from '../../store';
import {reloadProfile} from '../../store/mainslice';
import {useSelector} from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons';
import {Post} from '../../models/post';
import SettingsModal from '../../components/SettingsModal';

interface ProfileProps {
  navigation: any;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileScreen(props: ProfileProps) {
  const {navigation, isSettingsModalOpen, setIsSettingsModalOpen} = props;
  const user = useSelector((state: RootState) => state.user);
  const loading = useSelector((state: RootState) => state.reloadUser);
  const userPosts = useSelector((state: Post) => state.posts);

  const [userBirthDate, setUserBirthDate] = useState<string>('');
  const [isDropDownFavListOpen, setIsDropDownFavListOpen] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();

  const onRefresh = async () => {
    await dispatch(reloadProfile());
  };

  const handleDropDownFavList = () => {
    console.log('drop down fav list');
    setIsDropDownFavListOpen(!isDropDownFavListOpen);
  };

  useEffect(() => {
    if (user?.birthDate) {
      const date = new Date(user?.birthDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      setUserBirthDate(`${day}/${month}/${year}`);
    }
  }, [user]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={loading as boolean} onRefresh={onRefresh} size={1} />}>
      <Stack>
        <Stack style={{flexDirection: 'row', alignItems: 'center'}}>
          <Stack>
            <Avatar
              image={{
                uri: user?.avatar ? user?.avatar : 'https://picsum.photos/200',
              }}
              size={100}
            />
          </Stack>
          <Stack style={{flexDirection: 'row', marginLeft: 60}}>
            <Stack
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}>
              <Text style={styles.follow}>{user?.nbFollowers}</Text>
              <Text style={styles.nbFollow}>Abonnés</Text>
            </Stack>
            <Stack style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.follow}>{user?.nbFollowed}</Text>
              <Text style={styles.nbFollow}>Abonnements</Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack style={styles.infoContainer}>
        <Text style={styles.pseudo}>@{user?.pseudo}</Text>
        {user?.biography && <Text style={styles.biography}>{user?.biography}</Text>}
      </Stack>
      <Stack style={styles.btnContainer}>
        <FAB
          style={styles.btnEdit}
          labelContainerStyle={{width: '100%', alignItems: 'center', marginTop: 2}}
          label={() => <Text style={{fontSize: 12, fontWeight: 'bold'}}>Modifier mon profil</Text>}
          size="mini"
          variant="extended"
          color="white"
          pressEffect="none"
          onPress={() => navigation.navigate('EditProfile')}></FAB>
        <Button
          style={styles.btnShowMore}
          title={() =>
            !isDropDownFavListOpen ? (
              <MaterialIcons name="arrow-drop-down" size={20} />
            ) : (
              <MaterialIcons name="arrow-drop-up" size={20} />
            )
          }
          color="white"
          pressEffect="none"
          variant="contained"
          onPress={handleDropDownFavList}></Button>
      </Stack>
      {isSettingsModalOpen && (
        <SettingsModal isModalOpen={isSettingsModalOpen} setIsModalOpen={setIsSettingsModalOpen} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 100,
    marginTop: 20,
  },
  infoContainer: {
    marginLeft: 5,
    marginTop: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  btnContainer: {
    marginTop: 25,
    flexDirection: 'row',
  },
  btnEdit: {
    width: '80%',
    backgroundColor: '#F5F5F5',
    borderColor: '#F5F5F5',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
  },
  btnShowMore: {
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    borderColor: '#F5F5F5',
    borderWidth: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    width: '10%',
    alignItems: 'center',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  pseudo: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  biography: {
    fontSize: 15,
    marginTop: 10,
  },
  name: {
    fontSize: 19,
    color: '#666666',
  },
  follow: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  nbFollow: {
    fontSize: 12,
    color: '#666666',
  },
});

export default ProfileScreen;
