import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyText from "../../components/MyText";

export default function AjuScreens({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate("configuracao")}>
					<Ionicons name="arrow-back" size={24} color="black" />
				</TouchableOpacity>
				<MyText style={styles.headerTitle}>Ajuda</MyText>
			</View>

			<View style={{ paddingHorizontal: 16 }}>
				<TouchableOpacity style={styles.item}>
					<MyText style={styles.itemText}>Central de Ajuda</MyText>
					<Ionicons name="chevron-forward" size={20} color="white" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.item}>
					<MyText style={styles.itemText}>
						Ajuda sobre privacidade e segurança
					</MyText>
					<Ionicons name="chevron-forward" size={20} color="white" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.item}>
					<MyText style={styles.itemText}>Solicitações de suporte</MyText>
					<Ionicons name="chevron-forward" size={20} color="white" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.item}>
					<MyText style={styles.itemText}>Perguntas Frequentes</MyText>
					<Ionicons name="chevron-forward" size={20} color="white" />
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
		borderBottomColor: "black",
	},
	itemText: {
		color: "black",
		fontSize: 16,
		fontWeight: "400",
	},
});
