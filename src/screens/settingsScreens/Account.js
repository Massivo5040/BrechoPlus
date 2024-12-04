import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

import { auth } from "../../firebase/firebaseConnection";
import { signOut, deleteUser } from "firebase/auth";
import MyText from "../../components/MyText";

export default function ContScreens({ navigation }) {
	console.log(auth.currentUser);

	const showSignOutDialog = () => {
		return Alert.alert(
			"Você tem certeza?",
			"Você tem certeza que quer sair da sua conta?",
			[
				{
					text: "Yes",
					onPress: async () => {
						await signOut(auth);

						navigation.navigate("Login");
					},
				},
				{
					text: "No",
				},
			]
		);
	};

	const showDeleteUserDialog = () => {
		return Alert.alert(
			"Você tem certeza?",
			"Você tem certeza que quer DELETAR a sua conta? \nEssa é uma ação irreversível.",
			[
				{
					text: "Yes",
					onPress: async () => {
						await deleteUser(auth.currentUser).catch((err) => console.log(err));

						navigation.navigate("Signin");
					},
				},
				{
					text: "No",
				},
			]
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate("configuracao")}>
					<Ionicons name="arrow-back" size={24} color="black" />
				</TouchableOpacity>
				<MyText style={styles.headerTitle}>Conta</MyText>
			</View>

			<View style={styles.statusList}>
				<TouchableOpacity style={styles.statusItem}>
					<FontAwesome name="file-text" size={24} color="#fff" />
					<View style={styles.statusText}>
						<MyText style={styles.statusTitle}>Nome de usuário</MyText>
					</View>
					<MaterialIcons name="check-circle" size={24} color="green" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.statusItem}>
					<FontAwesome name="eye-slash" size={24} color="#fff" />
					<View style={styles.statusText}>
						<MyText style={styles.statusTitle}>Senha forte</MyText>
					</View>
					<MaterialIcons name="check-circle" size={24} color="green" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.statusItem}>
					<MaterialIcons name="block" size={24} color="#fff" />
					<View style={styles.statusText}>
						<MyText style={styles.statusTitle}>Suas avaliações</MyText>
					</View>
					<MaterialIcons name="chevron-right" size={24} color="#fff" />
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.statusItems}
					onPress={showSignOutDialog}
				>
					<View style={styles.statusText}>
						<MyText style={styles.statusTitles}>SAIR</MyText>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.statusItems}
					onPress={showDeleteUserDialog}
				>
					<View style={styles.statusText}>
						<MyText style={styles.statusTitles}>EXCLUIR CONTA</MyText>
					</View>
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
	statusList: {
		marginTop: 32,
		paddingHorizontal: 16,
	},
	statusItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "gray",
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
	},
	statusItems: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "red",
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
		marginTop: 8,
	},
	statusText: {
		flex: 1,
		marginLeft: 16,
	},
	statusTitle: {
		color: "white",
		fontSize: 14,
	},
	statusTitles: {
		textAlign: "center",
		color: "white",
		fontSize: 18,
	},
});
