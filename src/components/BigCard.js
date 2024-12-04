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

export default function BigCard(props) {
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
				(props.link && handlePress(props.link)) ||
					(props.nav &&
						navigation.navigate("BigCardScreen", {
							title: props.title,
							img: props.img,
							name: props.name,
							others: props.others,
						}));
			}}
		>
			<MyText style={styles.title}>
				{props.title.length > 25
					? props.title.slice(0, 26) + "..."
					: props.title}
			</MyText>

			{props.img && (
				<Image style={styles.img} source={props.img} contentFit="contain" />
			)}

			{props.productList && (
				<FlatList
					data={props.productList}
					renderItem={({ item }) => (
						<View
							style={[
								styles.row,
								{ borderBottomWidth: 1, marginBottom: 15, paddingBottom: 10 },
							]}
						>
							<Image
								style={{ width: 100, height: 100 }}
								source={{
									uri: item.img,
								}}
								contentFit="cover"
							/>
							<View>
								<MyText style={[styles.text, { width: 220 }]}>
									{item.name}
								</MyText>
								<MyText
									style={[styles.text, { width: 220, textAlign: "right" }]}
								>
									R${item.price}
								</MyText>
							</View>
						</View>
					)}
					keyExtractor={(item) => Math.floor(Math.random() * 100)}
				/>
			)}

			<View style={styles.row}>
				<MyText style={styles.text}>
					{props.name.length > 25
						? props.name.slice(0, 26) + "..."
						: props.name}
				</MyText>
				<MyText style={[styles.text, { textAlign: "right" }]}>
					R${props.others}
				</MyText>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "#E5E5E5",
		padding: 10,
		marginBottom: 10,
		borderRadius: 15,
	},
	img: {
		width: "98%",
		height: 250,
		marginHorizontal: "auto",
	},
	title: {
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
