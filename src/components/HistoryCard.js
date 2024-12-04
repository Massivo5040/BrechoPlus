import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import MyText from "./MyText";

export default function HistoryCard({ data }) {
	const [icon, setIcon] = useState(false);
	const navigation = useNavigation();

	return (
		<TouchableOpacity style={styles.container}>
			<Image style={styles.img} source={data.img} contentFit="cover" />
			<MyText style={styles.name}>
				{data.name.length > 13 ? data.name.slice(0, 14) + "..." : data.name}
			</MyText>
			<View style={styles.row}>
				<MyText style={styles.text}>R${data.price.replace(".", ",")}</MyText>

				<TouchableOpacity onPress={() => setIcon(!icon)}>
					<MaterialCommunityIcons
						name={icon ? "cart" : "cart-outline"}
						size={28}
						color="blue"
					/>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 178,
		padding: 10,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: "blue",
	},
	img: {
		width: "98%",
		height: 150,
		marginHorizontal: "auto",
		borderRadius: 20,
		backgroundColor: "blue",
	},
	name: {
		fontSize: 15,
		color: "blue",
		fontWeight: "thin",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 18,
		color: "blue",
		fontWeight: "bold",
	},
});
