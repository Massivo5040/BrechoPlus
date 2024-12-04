import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Linking,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

import MyText from "./MyText";

{
	/* <Image
  style={styles.logo}
  source={require("../../assets/logo.png")}
  contentFit="contain"
/>; */
}

export default function OngCard(props) {
	const navigation = useNavigation();

	const handlePress = async (url) => {
		try {
			const supported = await Linking.canOpenURL(url);
			if (supported) {
				await Linking.openURL(url);
			} else {
				Alert.alert("Erro", "Não foi possível abrir o URL: " + url);
			}
		} catch (error) {
			Alert.alert("Erro", "Ocorreu um erro ao abrir o URL: " + error.message);
		}
	};

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				handlePress(props.link);
			}}
		>
			{props.img && (
				<Image style={styles.img} source={props.img} contentFit="cover" />
			)}

			<MyText style={styles.title}>
				{props.title.length > 25
					? props.title.slice(0, 26) + "..."
					: props.title}
			</MyText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "#D9D9D9",
		padding: 0,
		paddingBottom: 10,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6,
	},
	img: {
		width: "100%",
		height: 200,
	},
	title: {
		textAlign: "center",
		fontSize: 22,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	text: {
		width: 160,
		fontSize: 18,
	},
});
