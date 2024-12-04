import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyText from "../../components/MyText";

export default function AccessibilityScreens({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate("configuracao")}>
					<Ionicons name="arrow-back" size={24} color="black" />
				</TouchableOpacity>
				<MyText style={styles.headerTitle}>Acessibilidade</MyText>
			</View>

			<View
				style={{
					paddingHorizontal: 16,
				}}
			>
				<TouchableOpacity style={styles.item}>
					<MyText style={styles.itemText}>Modo escuro</MyText>
				</TouchableOpacity>
			</View>
		</View>
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
	item: {
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#333",
	},
	itemText: {
		color: "black",
		fontSize: 16,
		fontWeight: "400",
	},
});
