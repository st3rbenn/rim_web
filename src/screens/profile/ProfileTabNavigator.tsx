import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {Box, FAB, HStack, Stack, VStack} from '@react-native-material/core';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Animated} from 'react-native';
import {Post} from '../../models/post';
import PostComponents from '../../components/Post';

interface ProfileTabNavigatorProps {
  posts?: Post[];
}

function ProfileTabNavigator(props: ProfileTabNavigatorProps) {
  const [currentTabSelected, setCurrentTabSelected] = useState<string>('postsTab');
  const slideRightEffect = useRef(new Animated.Value(0)).current;
  const slideLeftEffect = useRef(new Animated.Value(0)).current;
  const inverseSlideRightEffect = useRef(new Animated.Value(0)).current;
  const inverseSlideLeftEffect = useRef(new Animated.Value(0)).current;
  const {posts} = props;

  useEffect(() => {
    if (currentTabSelected === 'postsTab') {
      Animated.timing(slideRightEffect, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    if (currentTabSelected === 'questionTab') {
      Animated.timing(slideRightEffect, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [currentTabSelected]);

  const handleTabChange = (tab: string) => {
    setCurrentTabSelected(tab);
  };

  const cbAnim = useCallback(() => {
    if (currentTabSelected === 'postsTab') {
      Animated.timing(slideLeftEffect, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(inverseSlideLeftEffect, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    if (currentTabSelected === 'questionTab') {
      Animated.timing(slideLeftEffect, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(inverseSlideLeftEffect, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [currentTabSelected]);

  useEffect(() => {
    cbAnim();
  }, [cbAnim]);

  useEffect(() => {
    if (currentTabSelected === 'postsTab') {
      cbAnim();
    }
  }, [currentTabSelected, cbAnim]);

  const styles = StyleSheet.create({
    switchNavContainer: {
      backgroundColor: 'transparent',
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'center',
    },
    animatedSwitch: {
      position: 'absolute',
      width: '48%',
      height: 2,
      backgroundColor: '#000',
      bottom: 0,
      left: 0,
      transform: [
        {
          translateX: slideRightEffect.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 200],
          }) as any,
        },
      ],
    },
    animatedRightTab: {
      transform: [
        {
          translateX: slideRightEffect.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -400],
          }) as any,
        },
      ],
      width: '100%',
    },
    animatedLeftTab: {
      transform: [
        {
          translateX: slideLeftEffect.interpolate({
            inputRange: [0, 1],
            outputRange: [400, -380],
          }) as any,
        },
      ],
      width: '100%',
    },
    currentSelectedTab: {
      borderBottomWidth: 2,
    },
    switchNavBtn: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn: {
      backgroundColor: 'transparent',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 0,
      shadowOpacity: 0,
    },
    postContainer: {
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      marginTop: 15,
    },
    userInfoContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    messageContainer: {
      marginTop: 10,
    },
    userInfo: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: 10,
    },
    userName: {
      fontSize: 15,
      fontWeight: 'bold',
      marginRight: 5,
    },
    pseudoPost: {
      fontSize: 12,
      color: '#ccc',
    },
    postedAt: {
      fontSize: 12,
      color: '#ccc',
    },
    usernamePostedAt: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <>
      <Stack style={styles.switchNavContainer}>
        <Animated.View style={styles.animatedSwitch} />
        <FAB
          icon={({color}) => <Feather name="grid" size={17} color={color} />}
          iconContainerStyle={styles.switchNavBtn}
          style={styles.btn}
          pressEffect="none"
          onPress={() => handleTabChange('postsTab')}></FAB>
        <FAB
          icon={({color}) => <MaterialCommunityIcons name="message-question-outline" size={17} color={color} />}
          iconContainerStyle={styles.switchNavBtn}
          style={styles.btn}
          pressEffect="none"
          onPress={() => handleTabChange('questionTab')}></FAB>
      </Stack>
      <HStack
        style={{
          marginBottom: posts && posts?.length > 4 ? 150 : 0,
          width: '100%',
        }}>
        <Animated.View style={styles.animatedRightTab}>
          <Box
            style={{
              marginTop: 20,
              width: '100%',
            }}>
            {posts?.map((post) => (
              <PostComponents key={post.id} post={post} />
            ))}
          </Box>
        </Animated.View>
        <Animated.View style={styles.animatedLeftTab}>
          <Box
            style={{
              marginTop: 20,
              width: '100%',
            }}>
            {posts?.map((post) => (
              <PostComponents key={post.id} post={post} />
            ))}
          </Box>
        </Animated.View>
      </HStack>
    </>
  );
}

export default ProfileTabNavigator;
