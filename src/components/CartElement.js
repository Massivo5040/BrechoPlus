import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import MyText from "./MyText";
import { CartContext } from "../contexts/CartContext";
import { useFocusEffect } from "@react-navigation/native";

export default function CartElement({ data }) {
	const { cart, addItemCart, calcTotalPrice, removeItemCart } =
		useContext(CartContext);
	const [units, setUnits] = useState(0);

	useEffect(() => {
		setUnits(data.amount);
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Image source={data.img} style={styles.img} contentFit="cover" />
				<MyText style={styles.text}>{data.name}</MyText>
			</View>

			<View style={styles.row}>
				<MyText style={styles.text}>R${data.price}</MyText>
				<MyText style={[styles.text, { textAlign: "right" }]}>
					{units} unidades
				</MyText>
			</View>

			<View style={styles.row}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						addItemCart(data);
						setUnits(data.amount);
					}}
				>
					<MyText style={styles.buttonText}>Adicionar 1 unidade</MyText>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: "#EA4141" }]}
					onPress={() => {
						removeItemCart(data);
						setUnits(data.amount);
					}}
				>
					<MyText style={styles.buttonText}>Remover 1 unidade</MyText>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "95%",
		backgroundColor: "#80A7FB",
		padding: 15,
		borderRadius: 15,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	img: {
		width: 150,
		height: 150,
	},
	text: {
		width: "50%",
	},
	button: {
		backgroundColor: "#22C73A",
		padding: 10,
		borderRadius: 10,
	},
	buttonText: {
		fontSize: 14,
		color: "white",
	},
});
