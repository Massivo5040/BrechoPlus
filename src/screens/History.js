import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Image,
	FlatList,
	TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { auth, db } from "../firebase/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";
import MyText from "../components/MyText";
import NotificationButton from "../components/NotificationButton";
import BigCard from "../components/BigCard";

export default function History({ navigation }) {
	const [historico, setHistorico] = useState([]);
	const [loading, setLoading] = useState(true);
	const user = auth.currentUser;

	// {
	// 	id: "1",
	// 	title: "Lista de Produtos:",
	// 	productList: [
	// 		{ id: "1a", name: "Camiseta Listrada", price: "29.90" },
	// 		{ id: "1b", name: "Calça Jeans", price: "79.90" },
	// 	],
	// 	purchDate: "20/08/2024",
	// 	totalPrice: "R$109.80",
	// },

	async function getDados() {
		const docRef = collection(db, "Historico");

		getDocs(docRef)
			.then((snapshot) => {
				let lista = [];
				let productList = [];
				snapshot.forEach((doc) => {
					if (doc.data().pagador == user.displayName) {
						doc.data().compras.forEach((e, i) => {
							productList.push({
								name: e,
								price: doc.data().precos[i],
								img: doc.data().imagens[i],
							});
						});
						lista.push({
							id: doc.id,
							title: "Lista de produtos",
							productList: [...productList],
							purchDate: doc.data().data,
							totalPrice: doc.data().total,
						});
						productList = [];
					}
				});
				setHistorico(lista);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		getDados();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.row}>
					<TouchableOpacity onPress={() => navigation.navigate("Home")}>
						<MaterialCommunityIcons name="arrow-left" size={32} color="black" />
					</TouchableOpacity>
					<Image
						style={styles.logo}
						source={require("../../assets/logo.png")}
						contentFit="cover"
					/>
				</View>
				<NotificationButton
					style={styles.iconContainer}
					nav={() => navigation.navigate("NotificationScreen")}
				/>
			</View>

			<View style={styles.navigation}>
				<TouchableOpacity
					style={styles.navItem}
					onPress={() => navigation.navigate("Ongs")}
				>
					<MaterialCommunityIcons name="leaf" size={24} color="black" />
					<MyText style={styles.navText}>ONGs</MyText>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.selectedItem}
					onPress={() => navigation.navigate("History")}
				>
					<MaterialCommunityIcons name="history" size={24} color="black" />
					<MyText style={styles.navText}>Histórico</MyText>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.navItem}
					onPress={() => navigation.navigate("Products")}
				>
					<MaterialCommunityIcons name="tag-outline" size={24} color="black" />
					<MyText style={styles.navText}>Produtos</MyText>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.navItem}
					onPress={() => navigation.navigate("Cart")}
				>
					<MaterialCommunityIcons name="cart-outline" size={24} color="black" />
					<MyText style={styles.navText}>Carrinho</MyText>
				</TouchableOpacity>
			</View>

			{loading ? (
				<MyText>CARREGANDO...</MyText>
			) : (
				<FlatList
					contentContainerStyle={styles.content}
					data={historico}
					renderItem={({ item }) => (
						<BigCard
							title={item.title}
							productList={item.productList}
							name={item.purchDate}
							others={item.totalPrice}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	logo: {
		width: 300,
		height: 80,
	},
	iconContainer: {
		position: "absolute",
		top: 10,
		right: 15,
	},
	notificationIcon: {
		width: 20,
		height: 20,
	},
	searchInput: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		margin: 10,
		paddingLeft: 10,
	},

	navigation: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "#fff",
		paddingVertical: 10,
	},
	navItem: {
		alignItems: "center",
	},
	navText: {
		fontSize: 12,
		color: "gray",
	},
	selectedItem: {
		alignItems: "center",
		backgroundColor: "#DCDE58",
		paddingHorizontal: 5,
		borderRadius: 10,
	},
	content: {
		width: "90%",
		marginHorizontal: "auto",
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2, // Para Android
	},
	cardImage: {
		width: "100%",
		height: 200,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},

	cardContent: {
		padding: 10,
	},
	bottomNavigation: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "#fff",
		paddingVertical: 15,
		borderTopWidth: 1,
		borderTopColor: "#eee",
	},
	bottomNavItem: {
		alignItems: "center",
	},
});
