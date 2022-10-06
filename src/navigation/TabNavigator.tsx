import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import {Feather, Ionicons} from '@expo/vector-icons';
import NotificationScreen from '../screens/NotificationScreen';
import {useSelector} from 'react-redux';
import {RootState, useAppThunkDispatch} from '../store';
import {useState} from 'react';
import CustomHeader from '../components/CustomHeader';
import {RefreshControl, ScrollView} from 'react-native';
import {reloadProfile} from '../store/mainslice';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [currentRoute, setCurrentRoute] = useState<string | undefined>('');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.user);
  const tokenAuth = useSelector((state: any) => state.userToken);
  const userLoading = useSelector((state: any) => state.userLoading);

  const dispatch = useAppThunkDispatch();

  const onRefresh = async () => {
    await dispatch(reloadProfile());
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={
        tokenAuth && {
          header: () => (
            <CustomHeader
              title={currentRoute}
              isProfileSettingsModalOpen={isSettingsModalOpen}
              setIsProfileSettingsModalOpen={setIsSettingsModalOpen}
            />
          ),
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'hsla(0, 0%, 94%, 1)',
            shadowColor: 'transparent',
            width: '100%',
          },
          headerShown: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            elevation: 0,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height: '12%',
          },
          tabBarActiveTintColor: '#9141F8',
        }
      }>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Ionicons
                name="home-outline"
                size={size}
                color={color}
                style={{
                  marginTop: 25,
                }}
              />
            );
          },
        }}
        listeners={({route}) => ({
          tabPress: () => {
            setCurrentRoute(route.name);
          },
        })}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Ionicons
                name="search"
                size={size}
                color={color}
                style={{
                  marginTop: 25,
                }}
              />
            );
          },
        }}
        listeners={({route}) => ({
          tabPress: () => {
            setCurrentRoute(route.name);
          },
        })}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Ionicons
                name="notifications-outline"
                size={size}
                color={color}
                style={{
                  marginTop: 25,
                }}
              />
            );
          },
        }}
        listeners={({route}) => ({
          tabPress: () => {
            setCurrentRoute(route.name);
          },
        })}
      />
      <Tab.Screen
        name="ProfileTab"
        children={(props) => (
          <ProfileScreen
            {...props}
            isSettingsModalOpen={isSettingsModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
          />
        )}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Feather
                name="user"
                size={size}
                color={color}
                style={{
                  marginTop: 25,
                }}
              />
            );
          },
        }}
        listeners={() => ({
          focus: () => {
            setCurrentRoute(userData?.name);
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
