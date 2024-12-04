import React, { useState, useEffect, useContext, useRef } from "react";
import { Image } from "expo-image";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { auth, db } from "../firebase/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

{
	/* <MaterialCommunityIcons name="bell-outline" size={24} color="black" /> */
}
{
	/* <MaterialCommunityIcons name="bell-badge-outline" size={24} color="black" /> */
}

import SmallCard from "../components/SmallCard";
import MyText from "../components/MyText";
import NotificationButton from "../components/NotificationButton";
// import { CartContext } from "../contexts/CartContext";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function Home() {
	const navigation = useNavigation();
	const user = auth.currentUser;

	const [searchText, setSearchText] = useState("");
	const [loading, setLoading] = useState(true);
	const [color, setColor] = useState(true);

	const [roupas, setRoupas] = useState([]);

	const [expoPushToken, setExpoPushToken] = useState("");
	const [channels, setChannels] = useState([]);
	const [notification, setNotification] = useState(undefined);

	const notificationListener = useRef();
	const responseListener = useRef();

	async function getDados() {
		const docRef = collection(db, "Vestuario");

		getDocs(docRef)
			.then((snapshot) => {
				let lista = [];
				snapshot.forEach((doc) => {
					lista.push({
						id: doc.id,
						name: doc.data().nome,
						img: doc.data().imagem,
						owner: doc.data().dono,
						price: doc.data().preco,
						interested: doc.data().interessados,
					});
				});
				setRoupas(lista);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		getDados();

		registerForPushNotificationsAsync().then(
			(token) => token && setExpoPushToken(token)
		);

		if (Platform.OS === "android") {
			Notifications.getNotificationChannelsAsync().then((value) =>
				setChannels(value ?? [])
			);
		}

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response.notification);
			});

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			responseListener.current &&
				Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	function entrou() {
		setColor(false);
	}

	function saiu() {
		setColor(true);
	}

	return (
		<SafeAreaView style={styles.safeContainer}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Image
						style={styles.logo}
						source={require("../../assets/logo.png")}
						contentFit="cover"
					/>
					<NotificationButton
						style={styles.iconContainer}
						nav={() => navigation.navigate("NotificationScreen")}
					/>
				</View>
				<View style={styles.searchContainer}>
					<MaterialCommunityIcons
						name="magnify"
						size={30}
						color="black"
						style={styles.searchIcon}
					/>
					<TextInput
						style={[
							styles.searchInput,
							color ? { borderColor: "black" } : { borderColor: "#3B5998" },
						]}
						placeholder="Procure o nome da roupa"
						value={searchText}
						onChangeText={setSearchText}
						onFocus={entrou}
						onSubmitEditing={saiu}
					/>
				</View>

				{loading ? (
					<MyText>CARREGANDO...</MyText>
				) : searchText === "" ? (
					<FlatList
						contentContainerStyle={styles.categoryContainer}
						data={roupas}
						renderItem={({ item }) => <SmallCard data={item} />}
						keyExtractor={(item) => item.id}
					/>
				) : (
					<FlatList
						contentContainerStyle={styles.categoryContainer}
						data={roupas.filter((roupa) => roupa.name.includes(searchText))}
						renderItem={({ item }) => <SmallCard data={item} />}
						keyExtractor={(item) => item.id}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "compra realizada com sucesso",
			body: "sua compra feita com *nome da loja* no valor de R$***** foi aprovada.",
		},
		trigger: { seconds: 2 },
	});
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}

		try {
			const projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ??
				Constants?.easConfig?.projectId;
			if (!projectId) {
				throw new Error("Project ID not found");
			}
			token = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data;
			console.log(token);
		} catch (e) {
			token = `${e}`;
		}
	} else {
		alert("Must use physical device for Push Notifications");
	}

	return token;
}

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
	},
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
	logo: {
		width: 300,
		height: 80,
	},
	iconContainer: {
		position: "absolute",
		top: 10,
		right: 15,
	},
	searchContainer: {
		position: "relative",
	},
	searchIcon: {
		position: "absolute",
		left: 18,
		top: 18,
	},
	notificationIcon: {
		width: 20,
		height: 20,
	},
	searchInput: {
		height: 45,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 25,
		padding: 10,
		paddingLeft: 38,
		margin: 10,
		fontFamily: "Poppins",
	},
	categoriesHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: "#3B5998",
	},
	categoriesHeaderText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	arrowIcon: {
		width: 20,
		height: 20,
		tintColor: "white",
	},
	categoryContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		padding: 10,
		gap: 15,
	},
	categoryItem: {
		width: "45%", // Para ocupar aproximadamente metade da largura da tela por item. Ajuste conforme necessário.
		aspectRatio: 1, // Mantém a proporção quadrada
		margin: 5,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#eee",
		borderRadius: 8,
	},
	placeholderItem: {
		// Estilo para os espaços reservados
		width: "45%",
		aspectRatio: 1,
		margin: 5,
		backgroundColor: "#f2f2f2",
		borderRadius: 8,
	},
	categoryImage: {
		width: 50,
		height: 50,
		tintColor: "#888",
	},

	bottomNavigation: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
		paddingVertical: 15,
	},
	bottomNavigationIcon: {
		width: 24,
		height: 24,
		tintColor: "gray",
	},
});
