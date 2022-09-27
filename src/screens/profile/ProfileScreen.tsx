import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import React, { useCallback } from "react";
import { Button, Stack, Avatar, Text } from "@react-native-material/core";
import { RootState, useAppThunkDispatch } from "../../store";
import { logOut, reloadProfile } from "../../store/mainslice";
import { User } from "../../models/user";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileProps {
  navigation: any;
}

function ProfileScreen({ navigation }: ProfileProps) {
  let userData = useSelector((state: RootState) => state.user);
  const loading = useSelector((state: RootState) => state.loadingUser);
  const [userBirthDate, setUserBirthDate] = useState<string>("");
  const [isDropDownFavListOpen, setIsDropDownFavListOpen] =
    useState<boolean>(false);
  const route = useRoute();

  const dispatch = useAppThunkDispatch();

  const handleDisconnect = async () => {
    await dispatch(logOut());
  };

  const onRefresh = async () => {
    await dispatch(reloadProfile());
  }

  const handleDropDownFavList = () => {
    console.log("drop down fav list");
    setIsDropDownFavListOpen(!isDropDownFavListOpen);
  };

  useEffect(() => {
    if (userData?.birthDate) {
      const date = new Date(userData?.birthDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      setUserBirthDate(`${day}/${month}/${year}`);
    }
  }, [userData]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          size={1}
        />
    }>
      <Stack>
        <Stack style={{ flexDirection: "row", alignItems: "center" }}>
          <Stack>
            <Avatar
              image={{
                uri: "https://mui.com/static/images/avatar/1.jpg",
              }}
              size={100}
            />
          </Stack>
          <Stack style={{ flexDirection: "row", marginLeft: 60 }}>
            <Stack
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              <Text style={styles.follow}>{userData?.nbFollowers}</Text>
              <Text style={styles.nbFollow}>Abonnés</Text>
            </Stack>
            <Stack style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.follow}>{userData?.nbFollowed}</Text>
              <Text style={styles.nbFollow}>Abonnements</Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack style={styles.infoContainer}>
        <Text style={styles.pseudo}>@{userData?.pseudo}</Text>
        {userData?.biography && (
          <Text style={styles.biography}>{userData?.biography}</Text>
        )}
      </Stack>
      <Stack style={styles.btnContainer}>
        <Button
          style={{ width: "88%", marginRight: 7 }}
          title="Modifier mon profil"
          color="black"
          variant="outlined"
          uppercase={false}
          onPress={() => navigation.navigate("EditProfile")}
        ></Button>
        <Button
          style={{ width: "10%", alignItems: "center" }}
          title={() =>
            !isDropDownFavListOpen ? (
              <Ionicons name="arrow-down" size={15} />
            ) : (
              <Ionicons name="arrow-up" size={15} />
            )
          }
          color="black"
          variant="outlined"
          uppercase={false}
          onPress={handleDropDownFavList}
        ></Button>
      </Stack>
      <Button
        title="Se déconnecter"
        uppercase={false}
        onPress={handleDisconnect}
        style={{ width: "100%", marginTop: 20 }}
      ></Button>
    </ScrollView>
    /*   <View>
      <Text>ProfileScreen</Text>
      <Text>{userData?.firstName}</Text>
      <Text>{userData?.email}</Text>
      <Text>{userBirthDate}</Text>
      <Text>{userData?.pseudo}</Text>
      <Text>{userData?.avatar}</Text>
      <Button title="Se déconnecter" onPress={handleDisconnect}></Button>
    </View> */
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
    flexDirection: "column",
    alignItems: "flex-start",
  },
  btnContainer: {
    marginTop: 25,
    flexDirection: "row",
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  pseudo: {
    fontSize: 15,
    fontWeight: "bold",
  },
  biography: {
    fontSize: 15,
    marginTop: 5,
  },
  name: {
    fontSize: 19,
    color: "#666666",
  },
  follow: {
    fontSize: 19,
    fontWeight: "bold",
  },
  nbFollow: {
    fontSize: 12,
    color: "#666666",
  },
});

export default ProfileScreen;
