import React, { useState, useEffect, useContext } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Image,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { CartContext } from "../contexts/CartContext";

import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

import MyText from "../components/MyText";

export default function CreateClothe({ navigation }) {
	const { addNotification } = useContext(CartContext);
	const [image, setImage] = useState(null);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const auth = getAuth();
	const user = auth.currentUser;

	// useEffect(() => {
	// 	if (user.photoURL) setImage(user.photoURL);
	// }, []);
	const docRef = collection(db, "Vestuario");
	const addClothe = async (data) => {
		addDoc(docRef, data)
			.then((result) => console.log("deu certo"))
			.catch((err) => console.log(err));
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: `A(O) ${name} foi adicionada(o) com sucesso!`,
				body: `Agora sua roupa está a venda e pode ser comprada a qualquer momento.`,
			},
			trigger: { seconds: 2 },
		});
		addNotification({
			content: {
				title: `A(O) ${name} foi adicionada(o) com sucesso!`,
				body: `Agora sua roupa está a venda e pode ser comprada a qualquer momento.`,
			},
		});
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<MyText style={styles.text}>
					Tire uma foto da sua roupa ou adereço:
				</MyText>
				<TouchableOpacity
					style={styles.pickImageButton}
					onPress={() => pickImage()}
				>
					{image ? (
						<Image style={styles.img} source={{ uri: image }} />
					) : (
						<MaterialCommunityIcons
							style={styles.icon}
							name="paperclip"
							size={38}
							color="black"
						/>
					)}
				</TouchableOpacity>
			</View>

			<View style={styles.inputContainer}>
				<MyText style={styles.text}>Digite o nome da sua roupa:</MyText>
				<TextInput
					style={styles.input}
					placeholder="Nome da roupa"
					value={name}
					onChangeText={setName}
				/>
			</View>

			<View style={styles.inputContainer}>
				<View style={styles.row}>
					<MyText style={[styles.text, { alignSelf: "left" }]}>
						Digite o preço da roupa:
					</MyText>
					<TouchableOpacity
						style={styles.infoButton}
						onPress={() => {
							alert(
								"Digite o preço utilizando '.' ao invés da vírgula \nEx: 149.90"
							);

							alert("5% do preço será utilizado para manter o aplicativo");
						}}
					>
						<MaterialCommunityIcons
							name="information-outline"
							size={22}
							color="black"
						/>
					</TouchableOpacity>
				</View>
				<TextInput
					style={styles.input}
					placeholder="Preço da roupa"
					value={price}
					onChangeText={setPrice}
				/>
			</View>

			<TouchableOpacity
				style={styles.confirmButton}
				onPress={() => {
					if (image === null || name === "" || price === "") {
						alert("Preencha todos os campos");
						return;
					}
					addClothe({
						imagem: image,
						nome: name,
						preco: price,
						dono: user.displayName,
						interessados: Math.floor(Math.random() * 75) + 15,
					});
					alert("Sua roupa foi adicionada com sucesso");
					schedulePushNotification();
					navigation.navigate("Home");
				}}
			>
				<MyText style={[styles.text, { textAlign: "center", color: "white" }]}>
					Colocar à venda
				</MyText>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	inputContainer: {
		marginBottom: 32,
	},
	text: {
		fontSize: 18,
	},
	pickImageButton: {
		width: "95%",
		height: 250,
		backgroundColor: "red",
		backgroundColor: "red",
		borderRadius: 10,
		padding: 5,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "auto",
	},
	img: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
	},
	icon: {
		width: 38,
		// backgroundColor: "green",
	},
	input: {
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 10,
		fontFamily: "Poppins",
		fontSize: 16,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	infoButton: {
		marginLeft: 10,
		marginBottom: 5,
	},
	confirmButton: {
		backgroundColor: "green",
		padding: 10,
		borderRadius: 10,
	},
});
