import {
	StyleSheet,
	ScrollView,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../../types";
import { Stack } from "@react-native-material/core";
import { useAppThunkDispatch } from "../store";
import RegisterForm from "../components/form/RegisterForm";

export default function RegisterScreen({
	navigation,
}: RootTabScreenProps<"RegisterScreen">) {
	const dispatch = useAppThunkDispatch();

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView scrollEnabled>
        <Stack style={styles.container} spacing={50}>
          <Stack style={styles.infoBox} spacing={10}>
            <Text style={styles.heading}>Inscription</Text>
            <Text style={styles.subText}>
              Créez votre compte pour accéder l'application
            </Text>
          </Stack>
          {/* @ts-ignore */}
          <RegisterForm navigation={navigation} />
        </Stack>
      </ScrollView>
		</TouchableWithoutFeedback>
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
