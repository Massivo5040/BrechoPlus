import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MyText from "../../components/MyText";
import NotificationButton from "../../components/NotificationButton";

export default function Settings({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			<NotificationButton
				style={styles.iconContainer}
				nav={() => navigation.navigate("NotificationScreen")}
			/>
			<View style={styles.configContainer}>
				<MyText style={styles.title}>CONFIGURAÇÕES</MyText>
				<View style={styles.configsList}>
					<TouchableOpacity onPress={() => navigation.navigate("notificacao")}>
						<MyText style={styles.config}>Notificações</MyText>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate("seguranca")}>
						<MyText style={styles.config}>Segurança</MyText>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("acessibilidade")}
					>
						<MyText style={styles.config}>Acessibilidade</MyText>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate("conta")}>
						<MyText style={styles.config}>Conta</MyText>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate("ajuda")}>
						<MyText style={styles.config}>Ajuda</MyText>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate("sobre")}>
						<MyText style={styles.config}>Sobre</MyText>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EDEDED",
	},
	iconContainer: {
		position: "absolute",
		top: 10,
		right: 15,
	},
	configContainer: {
		width: "90%",
		height: "85%",
		backgroundColor: "#FCFCFC",
		borderRadius: 20,
		marginHorizontal: "auto",
		marginVertical: "auto",
	},
	title: {
		textAlign: "center",
		marginTop: 10,
		marginBottom: 40,
		fontSize: 24,
	},
	configsList: {
		width: "75%",
		marginHorizontal: "auto",
	},
	config: {
		paddingBottom: 8,
		marginBottom: 30,
		fontSize: 20,
		borderBottomWidth: 1,
	},
});
