import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Image,
	FlatList,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

import { auth, db } from "../firebase/firebaseConnection";
import { addDoc, collection, getDocs } from "firebase/firestore";

import MyText from "../components/MyText";
import OngCard from "../components/OngCard";
import NotificationButton from "../components/NotificationButton";

export default function Ongs({ navigation }) {
	// const navigation = useNavigation();
	const [searchText, setSearchText] = useState("");

	const [loading, setLoading] = useState(true);
	const [ongs, setOngs] = useState([]);

	// {
	// 	id: "1",
	// 	title: "Patas Amigas",
	// 	img: require("../../assets/ong.png"),
	// 	address: "Rua dos Cachorros, 123",
	// 	opHours: "Seg à Sex, 9h - 17h",
	// }

	async function getDados() {
		const docRef = collection(db, "Ong");

		getDocs(docRef)
			.then((snapshot) => {
				let lista = [];
				snapshot.forEach((doc) => {
					lista.push({
						id: doc.id,
						title: doc.data().nome,
						img: doc.data().imagem,
						address: doc.data().endereco,
						opHours: doc.data().atendimento,
						link: doc.data().link,
					});
				});
				setOngs(lista);
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
						contentFit="contain"
					/>
				</View>
				<NotificationButton
					style={styles.iconContainer}
					nav={() => navigation.navigate("NotificationScreen")}
				/>
			</View>

			<TextInput
				style={styles.searchInput}
				placeholder="procure"
				value={searchText}
				onChangeText={setSearchText}
			/>

			<View style={styles.navigation}>
				<TouchableOpacity
					style={styles.selectedItem}
					onPress={() => navigation.navigate("Ongs")}
				>
					<MaterialCommunityIcons name="leaf" size={24} color="black" />
					<MyText style={styles.navText}>ONGs</MyText>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.navItem}
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

			{/* <OngCard
				title="Ong muito boa"
				img={require("../../assets/ong.png")}
				name="Rua das flores, 233"
				others="seg à sex, 7h - 18h"
			/> */}

			{loading ? (
				<Text>CARREGANDO...</Text>
			) : searchText === "" ? (
				<FlatList
					contentContainerStyle={styles.ongsContainer}
					data={ongs}
					renderItem={({ item }) => (
						<OngCard
							title={item.title}
							img={item.img}
							name={item.address}
							others={item.opHours}
							nav={true}
							link={item.link}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			) : (
				<FlatList
					contentContainerStyle={styles.ongsContainer}
					data={ongs.filter((ong) => ong.title.includes(searchText))}
					renderItem={({ item }) => (
						<OngCard
							title={item.title}
							img={item.img}
							name={item.address}
							others={item.opHours}
							nav={true}
							link={item.link}
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
	ongsContainer: {
		width: "90%",
		marginHorizontal: "auto",
	},
});
