import React, { useState, useContext } from "react";
import {
	View,
	SafeAreaView,
	StyleSheet,
	Image,
	TouchableOpacity,
} from "react-native";
import MyText from "../components/MyText";

export default function BigCardScreen({ route }) {
	return (
		<SafeAreaView style={styles.cardContainer}>
			<View style={styles.photoContainer}>
				<Image style={styles.photo} source={route.params.img} />
			</View>
			<View style={styles.cardInformations}>
				<MyText style={styles.title}>{route.params.title}</MyText>
				<MyText style={styles.author}>{route.params.name}</MyText>
				<MyText style={styles.price}>{route.params.others}</MyText>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		flexDirection: "col",
		padding: 10,
	},
	photoContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: 230,
		padding: 10,
	},
	photo: {
		width: "90%",
		height: "100%",
	},
	cardInformations: {
		padding: 15,
	},
	title: {
		fontSize: 25,
		fontWeight: "bold",
	},
	author: {
		fontSize: 20,
		color: "#333",
	},
	price: {
		fontSize: 22,
	},
	button: {
		backgroundColor: "green",
		padding: 10,
		borderRadius: 10,
		marginBottom: 15,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
	},
});
