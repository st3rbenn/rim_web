import {
	StyleSheet,
	Modal,
	Pressable,
	Alert,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../../types";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import LogInForm from "../components/form/LogInForm";
import { Stack } from "@react-native-material/core";

export default function LogInScreen({
	navigation,
}: RootTabScreenProps<"LogInScreen">) {

	return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Stack style={styles.container}>
        <Stack style={styles.infoBox} spacing={20}>
          <Text style={styles.heading}>Connexion</Text>
          <Text style={styles.subText}>
            Connectez-vous à votre compte pour accéder à vos données
          </Text>
        </Stack>
        <LogInForm navigation={navigation} />
        <StatusBar style="auto" />
      </Stack>
    </TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0.6,
		justifyContent: "center",
		marginLeft: 16,
		marginRight: 16,
	},
	infoBox: {
		justifyContent: "center",
		alignItems: "flex-start",
		display: "flex",
		flex: 1,
		marginTop: 16,
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
