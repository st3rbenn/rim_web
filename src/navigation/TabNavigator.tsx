import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import { Feather, Ionicons } from "@expo/vector-icons";
import NotificationScreen from "../screens/NotificationScreen";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const userData = useSelector((state: RootState) => state.user);
  const tokenAuth = useSelector((state: any) => state.userToken);
  

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={
        tokenAuth
          && {
              header: ({navigation}) => <CustomHeader title={currentRoute} />,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'hsla(0, 0%, 94%, 1)',
                shadowColor: 'transparent',
                width: '100%',
              },
              headerShown: true,
              tabBarShowLabel: false,
              tabBarStyle: {
                position: "absolute",
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: "#ffffff",
                borderRadius: 15,
                height: "10%",
              },
              tabBarActiveTintColor: "#9141F8",
            }
      }
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
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
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            setCurrentRoute(route.name);
          },
        })}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
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
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            setCurrentRoute(route.name);
          },
        })}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
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
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            setCurrentRoute(route.name);
          },
        })}
      />
      <Tab.Screen
        name="ProfileTab"
        children={props => <ProfileScreen {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => {
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
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            setCurrentRoute(userData?.pseudo);
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;