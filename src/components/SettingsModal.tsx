import React from 'react';
import {Modal, StyleSheet, Text, Pressable, View, Animated} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

interface SettingsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SettingsModal({isModalOpen, setIsModalOpen}: SettingsModalProps) {
  const translationY = useSharedValue(0);
  const gesture = Gesture.Pan().onUpdate((e) => {
    translationY.value = e.translationY;
  });

  const slideDownAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateY: 2}],
    };
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.centeredView, slideDownAnimation]}>
        <Modal animationType="slide" transparent={true} visible={isModalOpen}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={handleCloseModal}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
