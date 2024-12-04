import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import MyText from "./MyText";

export default function NotificationCard({ data }) {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Image
					style={styles.logo}
					source={require("../../assets/logo.png")}
					contentFit="contain"
				/>
				<MyText style={styles.title}>{data.content.title}</MyText>
			</View>
			<MyText style={styles.text}>{data.content.body}</MyText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "95%",
		backgroundColor: "gray",
		marginHorizontal: "auto",
		padding: 10,
		borderRadius: 10,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	logo: {
		width: 65,
		height: 65,
	},
	title: {
		fontSize: 18,
		marginLeft: 15,
		width: "75%",
		fontWeight: "bold",
	},
	text: {
		marginLeft: 30,
		width: "90%",
	},
});
