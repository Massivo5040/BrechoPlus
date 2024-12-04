import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyText from "../../components/MyText";

export default function NotScreens({ navigation }) {
	const [feedbackEmail, setFeedbackEmail] = useState("Ativado");
	const [reminderEmail, setReminderEmail] = useState("Ativado");

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate("configuracao")}>
					<Ionicons name="arrow-back" size={24} color="black" />
				</TouchableOpacity>
				<MyText style={styles.headerTitle}>Notificações</MyText>
			</View>

			<View style={styles.content}>
				<MyText style={styles.sectionTitle}>Notificações por email</MyText>

				<View style={styles.optionGroup}>
					<MyText style={styles.optionTitle}>Emails de feedback</MyText>
					<View style={styles.radioGroup}>
						<TouchableOpacity
							style={styles.radioOption}
							onPress={() => setFeedbackEmail("Desativado")}
						>
							<View
								style={[
									styles.radioCircle,
									feedbackEmail === "Desativado" && styles.radioSelected,
								]}
							/>
							<MyText style={styles.radioText}>Desativado</MyText>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.radioOption}
							onPress={() => setFeedbackEmail("Ativado")}
						>
							<View
								style={[
									styles.radioCircle,
									feedbackEmail === "Ativado" && styles.radioSelected,
								]}
							/>
							<MyText style={styles.radioText}>Ativado</MyText>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.optionGroup}>
					<MyText style={styles.optionTitle}>Emails de Promoções</MyText>
					<View style={styles.radioGroup}>
						<TouchableOpacity
							style={styles.radioOption}
							onPress={() => setReminderEmail("Desativado")}
						>
							<View
								style={[
									styles.radioCircle,
									reminderEmail === "Desativado" && styles.radioSelected,
								]}
							/>
							<MyText style={styles.radioText}>Desativado</MyText>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.radioOption}
							onPress={() => setReminderEmail("Ativado")}
						>
							<View
								style={[
									styles.radioCircle,
									reminderEmail === "Ativado" && styles.radioSelected,
								]}
							/>
							<MyText style={styles.radioText}>Ativado</MyText>
						</TouchableOpacity>
					</View>
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
		borderBottomColor: "black",
	},
	headerTitle: {
		color: "black",
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
	optionGroup: {
		marginBottom: 32,
	},
	optionTitle: {
		color: "black",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 16,
	},
	radioGroup: {
		marginBottom: 8,
	},
	radioOption: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	radioCircle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "black",
		marginRight: 12,
	},
	radioSelected: {
		backgroundColor: "black",
	},
	radioText: {
		color: "black",
		fontSize: 14,
	},
	optionDescription: {
		color: "#aaa",
		fontSize: 12,
		marginTop: 4,
	},
});
