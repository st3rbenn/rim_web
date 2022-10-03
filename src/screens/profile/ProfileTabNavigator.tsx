import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Post} from 'src/models/post';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import PostTab from './PostTab';

const Tab = createMaterialTopTabNavigator();

interface ProfileTabNavigatorProps {
  posts?: Post[];
}

const ProfileTabNavigator = (props: ProfileTabNavigatorProps) => {
  const {posts} = props;
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
          },
        }}>
        <Tab.Screen
          name="Posts"
          children={() => <PostTab posts={posts} />}
          options={{
            tabBarLabel: ({color}) => <Feather name="grid" size={17} color={color} />,
            tabBarStyle: {backgroundColor: 'hsla(0, 0%, 100%, 0)'},
          }}
        />
        <Tab.Screen
          name="test"
          component={PostTab}
          options={{
            tabBarLabel: ({color}) => (
              <MaterialCommunityIcons name="message-question-outline" size={17} color={color} />
            ),
            tabBarStyle: {backgroundColor: 'hsla(0, 0%, 100%, 0)'},
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default ProfileTabNavigator;
