import React, { useState, useContext } from "react";
import {
	View,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from "react-native";
import { Image } from "expo-image";
import MyText from "../components/MyText";
import { CartContext } from "../contexts/CartContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LittleButton from "../components/LittleButton";

export default function CardScreen({ route, navigation }) {
	const { cart, addItemCart } = useContext(CartContext);
	const [icon, setIcon] = useState(false);
	const coresRoupa = [
		"azul-marinho",
		"verde-oliva",
		"rosa-claro",
		"cinza-escuro",
		"bege",
		"branco",
	];
	const numerosRoupa = [28, 30, 32, 36, 38, 40];

	const numeroAleatorio = Math.floor(Math.random() * 6);

	function handleAddCart(item) {
		addItemCart(item);
	}

	return (
		<SafeAreaView style={styles.cardContainer}>
			<View style={styles.photoContainer}>
				<Image
					style={styles.photo}
					source={route.params.img}
					contentFit="cover"
				/>
			</View>
			<View style={styles.cardInformations}>
				<View style={styles.row}>
					<MyText style={styles.price}>
						R${route.params.price.replace(".", ",")}
					</MyText>

					<TouchableOpacity onPress={() => setIcon(!icon)}>
						<MaterialCommunityIcons
							name={icon ? "cards-heart" : "cards-heart-outline"}
							size={32}
							color="blue"
						/>
					</TouchableOpacity>
				</View>
				<MyText style={styles.title}>{route.params.name}</MyText>

				<View style={styles.littleButtonsContainer}>
					<MyText>Cor: {coresRoupa[numeroAleatorio]}</MyText>
					<FlatList
						horizontal={true}
						data={coresRoupa}
						renderItem={(item) => (
							<LittleButton
								data={item}
								style={{ marginRight: 10 }}
								random={numeroAleatorio}
							/>
						)}
					/>
				</View>

				<View style={styles.littleButtonsContainer}>
					<MyText>Tamanho: {numerosRoupa[numeroAleatorio]}</MyText>
					<FlatList
						horizontal={true}
						data={numerosRoupa}
						renderItem={(item) => (
							<LittleButton
								data={item}
								style={{
									marginRight: 10,
									width: 80,
									alignText: "center",
									paddingBottom: 2,
								}}
								random={numeroAleatorio}
							/>
						)}
					/>
				</View>

				<View style={styles.row}>
					<TouchableOpacity onPress={() => handleAddCart(route.params)}>
						<MaterialCommunityIcons name="cart-plus" size={48} color="blue" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							handleAddCart(route.params);
							navigation.navigate("Cart");
						}}
					>
						<MyText style={styles.buttonText}>Comprar agora</MyText>
					</TouchableOpacity>
				</View>
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
		marginHorizontal: "auto",
		width: "80%",
		height: 380,
		padding: 10,
	},
	photo: {
		width: "100%",
		height: "100%",
		borderRadius: 25,
	},
	cardInformations: {
		padding: 15,
	},
	title: {
		fontSize: 22,
		marginTop: 10,
		marginBottom: 25,
		paddingBottom: 5,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
	},
	littleButtonsContainer: {
		marginBottom: 25,
	},
	author: {
		fontSize: 20,
		color: "#333",
	},
	row: {
		width: "99.5%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	price: {
		fontSize: 28,
		color: "blue",
		fontWeight: "bold",
	},
	button: {
		width: 250,
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 10,
		marginBottom: 15,
	},
	buttonText: {
		textAlign: "center",
		color: "white",
		fontSize: 18,
	},
});
