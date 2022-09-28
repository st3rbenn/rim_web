import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import React, { useCallback } from "react";
import { Button, Stack, Avatar, Text } from "@react-native-material/core";
import { RootState, useAppThunkDispatch } from "../../store";
import { logOut, reloadProfile } from "../../store/mainslice";
import { User } from "../../models/user";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface ProfileProps {
  navigation: any;
}

function ProfileScreen({ navigation }: ProfileProps) {
  let user = useSelector((state: RootState) => state.user);
  let loading = useSelector((state: RootState) => state.reloadUser);
  const [userBirthDate, setUserBirthDate] = useState<string>("");
  const [isDropDownFavListOpen, setIsDropDownFavListOpen] =
    useState<boolean>(false);
    

  const dispatch = useAppThunkDispatch();

  const handleDisconnect = async () => {
    await dispatch(logOut());
  };

  const onRefresh = async () => {
    await dispatch(reloadProfile());
  };

  const handleDropDownFavList = () => {
    console.log("drop down fav list");
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
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} size={1} />
      }
    >
      <Stack>
        <Stack style={{ flexDirection: "row", alignItems: "center" }}>
          <Stack>
            <Avatar
              image={{
                uri: user?.avatar ? user?.avatar : "https://picsum.photos/200",
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
              <Text style={styles.follow}>{user?.nbFollowers}</Text>
              <Text style={styles.nbFollow}>Abonnés</Text>
            </Stack>
            <Stack style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.follow}>{user?.nbFollowed}</Text>
              <Text style={styles.nbFollow}>Abonnements</Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack style={styles.infoContainer}>
        <Text style={styles.pseudo}>{user?.name}</Text>
        {user?.biography && (
          <Text style={styles.biography}>{user?.biography}</Text>
        )}
      </Stack>
      <Stack style={styles.btnContainer}>
        <Button
          style={{ width: "88%", marginRight: 7 }}
          title="Modifier mon profil"
          color="white"
          pressEffect="none"
          variant="contained"
          uppercase={false}
          onPress={() => navigation.navigate("EditProfile")}
        ></Button>
        <Button
          style={{ width: "10%", alignItems: "center" }}
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
    marginLeft: 5,
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
