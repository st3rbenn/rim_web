import {ListItem, Pressable} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {RootState, useAppThunkDispatch} from '../store';
import {logOut} from '../store/mainslice';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {Feather} from '@expo/vector-icons';
import {useSelector} from 'react-redux';

interface SettingsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SettingsModal({isModalOpen, setIsModalOpen}: SettingsModalProps) {
  const dispatch = useAppThunkDispatch();
  const userLoading = useSelector((state: RootState) => state.reloadUser);

  const [scrollY, setScrollY] = useState<number>(0);

  const {height: windowHeight} = useWindowDimensions();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDisconnect = async () => {
    setIsModalOpen(false);
    await dispatch(logOut());
  };

  useEffect(() => {
    if (scrollY > 0) {
      console.log('need to be prevented');
    }
  }, [scrollY]);

  const handleStopDrag = () => {
    if (scrollY <= -70) {
      handleCloseModal();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isModalOpen} onDismiss={() => console.log('disimissed')}>
      <Pressable pressEffect="none" onPress={handleCloseModal}>
        <ScrollView
          onScroll={(ev) => setScrollY(ev.nativeEvent.contentOffset.y)}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={handleStopDrag}>
          <View style={[styles.centeredView, {height: windowHeight}]}>
            <View style={styles.modalView}>
              <ListItem title="paramètres" leading={<Feather name="settings" size={22} />} pressEffect="none" />
              <ListItem title="Enregistrer" leading={<Icon name="bookmark" size={22} />} pressEffect="none" />
              <ListItem
                title="Se déconnecter"
                pressEffect="none"
                leading={<Feather name="log-out" size={22} color="red" />}
                onPress={handleDisconnect}
                leadingMode="icon"
              />
            </View>
          </View>
        </ScrollView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SettingsModal;
