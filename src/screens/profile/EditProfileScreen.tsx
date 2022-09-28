import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Text } from "@react-native-material/core";
import { StatusBar } from "expo-status-bar";
import EditProfileForm from "../../components/form/EditProfileForm";
import CustomHeader from "../../components/CustomHeader";

function EditProfileScreen({ navigation }: any) {
  const [accept, setAccept] = useState(false);
  return (
    <>
      <CustomHeader
        title={navigation.getState().routes[1].name}
        setAccept={setAccept}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Stack style={styles.container} spacing={50}>
          <EditProfileForm navigation={navigation} handleAccept={accept}/>
        </Stack>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 100,
    marginTop: 20,
  },
  infoBox: {
    alignItems: "flex-start",
    marginTop: 16,
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#666666",
  },
});

export default EditProfileScreen;
