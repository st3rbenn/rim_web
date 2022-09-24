import {
	StyleSheet,
	Text,
	View,
	TextInput as NativeInput,
	Vibration,
	Modal,
	Alert,
} from "react-native";
import { Stack, Pressable, Button } from "@react-native-material/core";
import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { object, string } from "yup";
import { AxiosError } from "axios";
import { User } from "../../models/user";
import { useAppThunkDispatch } from "../../store";
import { RootTabScreenProps } from "../../../types";
import { authentication } from "../../store/mainslice";

function LogInForm({ navigation }: RootTabScreenProps<"LogInScreen">) {
	const dispatch = useAppThunkDispatch();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [logMessage, setLogMessage] = useState<string>("");

	const handleSubmit = async () => {
		try {
			const user: User = {
				email,
				password,
			};

			const res = await dispatch(authentication(user));
      if(res.meta.requestStatus === "rejected") {
				setLogMessage(res.payload.message);
				setModalVisible(true);
      } else {
				Vibration.vibrate();
				setLogMessage("Log in successful!");
				setIsAuthenticating(true);
				setModalVisible(true);
      }

		} catch (error) {
			const err = error as AxiosError;
			// @ts-ignore
			console.error(err.response?.data?.message);
			throw error;
		}
	};

	const logInSchema = object({
		email: string()
			.email(() => "L'email n'est pas valide")
			.required(() => "L'email est requis"),
		password: string().required("Le mot de passe est requis"),
	});

	return (
		<>
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={(values) => console.log(values)}
				validationSchema={logInSchema}
			>
				{({ handleChange, handleBlur, values, errors, touched }) => (
					<Stack spacing={25}>
						<Stack spacing={10}>
							<Text style={styles.label}>email</Text>
							<NativeInput
								style={styles.input}
								placeholder="email"
								onChangeText={handleChange("email")}
								onBlur={handleBlur("email")}
								value={values.email}
								onChange={(e) => setEmail(e.nativeEvent.text)}
							/>
							{errors.email && touched.email && (
								<Text style={styles.errorMsg}>{errors.email}</Text>
							)}
						</Stack>
						<Stack spacing={10}>
							<Text style={styles.label}>mot de passe</Text>
							<NativeInput
								style={styles.input}
								placeholder="mot de passe"
								secureTextEntry={true}
								onChangeText={handleChange("password")}
								onBlur={handleBlur("password")}
								value={values.password}
								onChange={(e) => setPassword(e.nativeEvent.text)}
							/>
							{errors.password && touched.password && (
								<Text style={styles.errorMsg}>{errors.password}</Text>
							)}
						</Stack>
						<Stack spacing={25}>
							<Button
								title="Ce connecter"
								uppercase={false}
								style={styles.button}
								onPress={() => handleSubmit()}
							></Button>
							<Text>
								Pas encore de compte ?
								<Text
									onPress={() => navigation.navigate("RegisterScreen")}
									style={{ color: "#3F51B5" }}
								>
									&ensp;Inscrivez-vous
								</Text>
							</Text>
						</Stack>
					</Stack>
				)}
			</Formik>
			{isAuthenticating && (
				<>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
							setModalVisible(!modalVisible);
						}}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalText}>{logMessage}</Text>
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => setModalVisible(!modalVisible)}
								>
									<Text style={styles.textStyle}>Fermer</Text>
								</Pressable>
							</View>
						</View>
					</Modal>
				</>
			)}
		</>
	);
}

export default LogInForm;

const styles = StyleSheet.create({
	label: {
		marginBottom: 8,
		fontSize: 16,
	},
	errorMsg: {
		color: "red",
		fontSize: 11,
		fontWeight: "bold",
	},
	connectionBtn: {
		justifyContent: "center",
		backgroundColor: "#9141F8",
	},
	input: {
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.27,
		borderRadius: 15,
		height: 50,
		paddingLeft: 16,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
		backgroundColor: "transparent",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		backgroundColor: "#9141F8",
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 15,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
