import {
  StyleSheet,
  useColorScheme,
  ScrollView,
	Keyboard,
	TouchableWithoutFeedback, } from "react-native";
import DatePickerIOS from "@react-native-community/datetimepicker";
import { Text, View } from "../components/Themed";
import { RootStackParamList, RootTabScreenProps } from "../../types";
import {
	Stack as MuiStack,
	TextInput,
	Flex,
	Button,
	Stack,
} from "@react-native-material/core";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios, { AxiosError } from "axios";
import { useAppThunkDispatch } from "../store";
import { register } from "../store/mainslice";
import { User } from "../models/user";
import { logger } from "react-native-logs";
import Logo from "../components/Logo";
import RegsiterForm from "../components/form/RegisterForm";

export default function RegisterScreen({
	navigation,
}: RootTabScreenProps<"RegisterScreen">) {
	const colorScheme = useColorScheme();

	const dispatch = useAppThunkDispatch();

	return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Stack style={{ flex: 1 }}>
          <Stack style={styles.infoBox} spacing={20}>
            <Text style={styles.heading}>Inscription</Text>
            <Text style={styles.subText}>
              Créez votre compte pour accéder l'application
            </Text>
          </Stack>
          <RegsiterForm navigation={navigation} />
        </Stack>
      </ScrollView>
    </TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginLeft: 16,
		marginRight: 16,
		paddingBottom: 50,
	},
	infoBox: {
		justifyContent: "center",
		alignItems: "flex-start",
		display: "flex",
		flex: 1,
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
