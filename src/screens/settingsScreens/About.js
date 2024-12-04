import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyText from "../../components/MyText";

export default function SobScreens({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate("configuracao")}>
					<Ionicons name="arrow-back" size={24} color="black" />
				</TouchableOpacity>
				<MyText style={styles.headerTitle}>Sobre</MyText>
			</View>

			<View
				style={{
					paddingHorizontal: 16,
				}}
			>
				<TouchableOpacity style={styles.item}>
					<MyText style={styles.itemText}>Sobre sua conta</MyText>
					<Ionicons name="chevron-forward" size={20} color="black" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.item}>
					<MyText style={styles.itemText}>Política de Privacidade</MyText>
					<Ionicons name="chevron-forward" size={20} color="black" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.item}>
					<MyText style={styles.itemText}>Termos de Uso</MyText>
					<Ionicons name="chevron-forward" size={20} color="black" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.item}>
					<MyText style={styles.itemText}>Ultimas Atualizações</MyText>
					<Ionicons name="chevron-forward" size={20} color="black" />
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
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
