import React, { useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Switch,
	SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyText from "../../components/MyText";

export default function SegScreens({ navigation }) {
	const [isPrivate, setIsPrivate] = useState(false);

	const toggleSwitch = () => setIsPrivate((previousState) => !previousState);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate("configuracao")}>
					<Ionicons name="arrow-back" size={24} color="black" />
				</TouchableOpacity>
				<MyText style={styles.headerTitle}>Privacidade da conta</MyText>
			</View>

			<View style={styles.content}>
				<MyText style={styles.sectionTitle}>Privacidade da conta</MyText>

				<View style={styles.optionContainer}>
					<MyText style={styles.optionTitle}>Conta privada</MyText>
					<MyText style={styles.optionDescription}>
						Termos sobre politica de privacidade{" "}
						<MyText style={styles.link}>Saiba mais</MyText>
					</MyText>
					<Switch
						trackColor={{ false: "#767577", true: "#34C759" }}
						thumbColor={isPrivate ? "#fff" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleSwitch}
						value={isPrivate}
						style={styles.switch}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderBottomColor: "#333",
	},
	headerTitle: {
		color: "black=",
		fontSize: 18,
		fontWeight: "bold",
		marginLeft: 16,
	},
	content: {
		flex: 1,
		padding: 16,
	},
	sectionTitle: {
		color: "black",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 24,
	},
	optionContainer: {
		backgroundColor: "#1a1a1a",
		borderRadius: 10,
		padding: 16,
	},
	optionTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	optionDescription: {
		color: "white",
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 16,
	},
	link: {
		color: "green",
		MytextDecorationLine: "underline",
	},
	switch: {
		alignSelf: "flex-end",
	},
});
