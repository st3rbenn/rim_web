import {
	StyleSheet,
	Text,
	TextInput as NativeInput,
	Keyboard,
	KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";
import { Stack, Button } from "@react-native-material/core";
import React, { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import { AxiosError } from "axios";
import { User } from "../../models/user";
import { useAppThunkDispatch } from "../../store";
import { RootTabScreenProps } from "../../../types";
import { register } from "../../store/mainslice";
import DateTimePicker from "@react-native-community/datetimepicker";

function RegisterForm({ navigation }: RootTabScreenProps<"RegisterScreen">) {
	const dispatch = useAppThunkDispatch();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [pseudo, setPseudo] = useState<string>("");
	const [birthDate, setBirthDate] = useState<Date | undefined>();
	const [isModalVisible, setModalVisible] = useState(false);

	const initialValues = {
		email: "",
		password: "",
		confirmPassword: "",
		pseudo: "",
		birthDate: "",
	};

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const matchPassword = () => {
		return password === confirmPassword;
	};

	const registerSchema = object({
		email: string()
			.email(() => "L'email n'est pas valide")
			.required(() => "L'email est requis"),
		password: string()
			.required("Le mot de passe est requis")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				"Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre"
			)
			.min(8, "Le mot de passe doit contenir au moins 8 caractères"),
		confirmPassword: string()
			.required("La confirmation du mot de passe est requise")
			.test(
				"passwords-match",
				"Les mots de passe ne correspondent pas",
				matchPassword
			),
		pseudo: string()
			.required("Le pseudo est requis")
			.min(3, "Le pseudo doit contenir au moins 3 caractères")
			.max(20, "Le pseudo doit contenir au plus 20 caractères"),
		birthDate: string()
			.required("La date de naissance est requise")
			.test(
				"birthDate",
				"Vous devez avoir plus de 18 ans pour vous inscrire",
				() => {
					if (birthDate) {
						const today = new Date();
						const eighteenYearsAgo = new Date(
							today.getFullYear() - 18,
							today.getMonth(),
							today.getDate()
						);
						return true;
					}
					return false;
				}
			),
	});

	const handleSubmit = async () => {
		try {
			const user: User = {
				email,
				password,
				pseudo,
				birthDate,
			};
			const res = await dispatch(register(user));
			// @ts-ignore
			if (res.meta.requestStatus === "rejected") {
				alert("Une erreur est survenue");
			} else {
				navigation.navigate("LogInScreen");
			}
		} catch (error) {
			const err = error as AxiosError;
			// @ts-ignore
			console.error(err.response?.data?.message);
			throw error;
		}
	};

	return (
		<KeyboardAvoidingView>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => console.log(values)}
				validationSchema={registerSchema}
			>
				{({ handleChange, handleBlur, values, errors, touched }) => (
					<Stack spacing={25}>
						<Stack spacing={10}>
							<Text style={styles.label}>pseudo</Text>
							<NativeInput
								placeholder="pseudo"
								onChangeText={handleChange("pseudo")}
								onBlur={handleBlur("pseudo")}
								value={values.pseudo}
								onChange={(e) => setPseudo(e.nativeEvent.text)}
								style={styles.input}
								collapsable={false}
							/>
							{errors.pseudo && touched.pseudo && (
								<Text style={styles.errorMsg}>{errors.pseudo}</Text>
							)}
						</Stack>
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
								placeholder="mot de passe"
								secureTextEntry={true}
								onChangeText={handleChange("password")}
								onBlur={handleBlur("password")}
								value={values.password}
								onChange={(e) => setPassword(e.nativeEvent.text)}
								style={styles.input}
							/>
							{errors.password && touched.password && (
								<Text style={styles.errorMsg}>{errors.password}</Text>
							)}
						</Stack>
						<Stack spacing={10}>
							<Text style={styles.label}>confirmer le mot de passe</Text>
							<NativeInput
								placeholder="confirmer le mot de passe"
								secureTextEntry={true}
								onChangeText={handleChange("confirmPassword")}
								onBlur={handleBlur("confirmPassword")}
								value={values.confirmPassword}
								onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
								style={styles.input}
							/>
							{errors.confirmPassword && touched.confirmPassword && (
								<Text style={styles.errorMsg}>{errors.confirmPassword}</Text>
							)}
						</Stack>
						<Stack spacing={25}>
							<Stack spacing={10}>
								<Text style={styles.label}>votre date de naissance</Text>
								<NativeInput
									placeholder="date de naissance"
									onChangeText={handleChange("birthDate")}
									onBlur={handleBlur("birthDate")}
									value={birthDate?.toLocaleDateString()}
									style={styles.input}
									onFocus={() => {
										Keyboard.dismiss();
										toggleModal();
									}}
								/>
								{errors.birthDate && touched.birthDate && (
									<Text style={styles.errorMsg}>{errors.birthDate}</Text>
								)}
							</Stack>
							<Stack style={styles.buttonContainer} spacing={25}>
                <Button
                  title="S'inscrire"
                  uppercase={false}
                  style={styles.button}
                  onPress={() => handleSubmit()}
                ></Button>
								<Text>
									Vous avez déjà un compte ?
									<Text
										onPress={() => navigation.navigate("LogInScreen")}
										style={{ color: "#3F51B5" }}
									>
										&ensp;Connectez-vous
									</Text>
								</Text>
							</Stack>
						</Stack>
					</Stack>
				)}
			</Formik>
			<>
				{isModalVisible && (
					<Modal
						isVisible={isModalVisible}
						onBackdropPress={toggleModal}
						style={{
							flex: 1,
							marginLeft: -40,
							marginRight: -40,
							justifyContent: "flex-end",
							alignItems: "center",
							height: 300,
							backgroundColor: "hsla(0, 0%, 94%, 0.5)",
						}}
						animationIn="slideInUp"
            animationOut="slideOutDown"
						backdropOpacity={0}
					>
						<DateTimePicker
							testID="dateTimePicker"
							value={birthDate || new Date()}
							mode="date"
							display="spinner"
							style={{
								width: "100%",
								height: "20%",
								backgroundColor: "white",
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
							}}
							onChange={(ev, selectedDate) => setBirthDate(selectedDate)}
						/>
					</Modal>
				)}
			</>
		</KeyboardAvoidingView>
	);
}

export default RegisterForm;

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
	buttonContainer: {
		alignItems: "stretch",
	},
	button: {
		backgroundColor: "#9141F8",
	},
	input: {
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.15,
		borderRadius: 15,
		height: 50,
		paddingLeft: 16,
	},
});
