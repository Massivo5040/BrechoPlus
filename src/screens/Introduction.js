import React, { useState } from "react";
import { Image } from "expo-image";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

import MyText from "../components/MyText";

export default function Introduction({ navigation }) {
	return (
		<SafeAreaView style={styles.safeContainer}>
			<StatusBar style="auto" />
			<View style={styles.container}>
				<Image
					style={styles.logo}
					source={require("../../assets/logo.png")}
					contentFit="contain"
				/>
				<View style={styles.card}>
					<MyText style={styles.title}>PRIMEIROS PASSOS</MyText>
					<MyText style={styles.text}>
						Precisamos de algumas informações para prosseguir.
					</MyText>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate("Introduction2")}
					>
						<MyText style={styles.buttonText}>PROSSEGUIR</MyText>
						<MaterialCommunityIcons
							name="arrow-right"
							size={24}
							color="white"
						/>
					</TouchableOpacity>
					<View style={styles.linkContainer}>
						<MyText>Já possui uma conta? </MyText>
						<TouchableOpacity onPress={() => navigation.navigate("Login")}>
							<MyText style={styles.linkText}>Clique aqui.</MyText>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: "#406C93",
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		width: 300,
		height: 300,
	},
	card: {
		backgroundColor: "#E8E8E8",
		borderRadius: 30,
		paddingHorizontal: 10,
		paddingVertical: 30,
		width: "85%",
		alignItems: "center",
	},
	title: {
		color: "#3D5972",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	text: {
		textAlign: "center",
		marginBottom: 20,
	},
	button: {
		flexDirection: "row",
		backgroundColor: "#406C93",
		borderRadius: 10,
		padding: 10,
		width: "80%",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
	},
	linkContainer: {
		flexDirection: "row",
		marginTop: 15,
	},
	linkText: {
		color: "#3A5Af8",
	},
	optionContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	optionText: {
		marginLeft: 10,
	},
	radioButtonOuter: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#ccc",
		alignItems: "center",
		justifyContent: "center",
	},
	radioButtonInner: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: "#2962FF",
	},
});
