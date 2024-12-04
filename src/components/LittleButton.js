import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MyText from "./MyText";

export default function LittleButton({ data, style, random }) {
	return (
		<TouchableOpacity
			style={[
				styles.container,
				random === data.index && styles.selected,
				style,
			]}
			disabled={!(random === data.index)}
		>
			<MyText style={styles.selectedText}>{data.item}</MyText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 25,
		paddingHorizontal: 7,
		paddingVertical: 5,
		backgroundColor: "gray",
		alignSelf: "left",
	},
	selected: {
		backgroundColor: "blue",
	},
	selectedText: {
		color: "white",
		textAlign: "center",
	},
});
