import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
	ScrollView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { TogglePasswordVisibility } from "../components/TogglePasswordVisibility";
import MyText from "../components/MyText";

import { auth } from "../firebase/firebaseConnection";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function LogScreens({ navigation }) {
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { passwordVisibility, icon, handlePasswordVisibility } =
		TogglePasswordVisibility();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (usuario) => {
			if ((user, usuario)) {
				setUser({
					email: user.email,
					uid: user.uid,
				});
				navigation.navigate("Home");
			}
		});

		unsub();
	}, []);

	function handleSignIn() {
		signInWithEmailAndPassword(auth, email, password)
			.then((user) => {
				setUser({
					email: user.email,
					uid: user.uid,
				});
				navigation.navigate("Home");
			})
			.catch((err) => {
				console.log(err.code);
				if (err.code == "auth/invalid-email") alert("EMAIL INVÁLIDO");
				if (err.code == "auth/missing-password") alert("A SENHA É OBRIGATÓRIA");
				if (err.code == "auth/invalid-credential") alert("SENHA INVÁLIDA");
			});
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.header}>
				<View style={styles.logoContainer}>
					<Image
						source={require("../../assets/logo.png")}
						style={styles.logo}
					/>
				</View>
			</View>

			<View style={styles.loginBox}>
				<MyText style={styles.loginText}>LOGIN</MyText>

				<TextInput
					placeholder="Email"
					style={styles.input}
					keyboardType="email-address"
					placeholderTextColor="#A0A0A0"
					value={email}
					onChangeText={(text) => {
						setEmail(text);
					}}
				/>

				<View style={styles.passwordInputContainer}>
					<TextInput
						placeholder="Senha"
						style={styles.input}
						secureTextEntry={passwordVisibility}
						minLength={8}
						placeholderTextColor="#A0A0A0"
						value={password}
						onChangeText={(text) => {
							setPassword(text);
						}}
					/>
					<TouchableOpacity
						onPress={handlePasswordVisibility}
						style={styles.iconButton}
					>
						<MaterialCommunityIcons name={icon} size={24} color="black" />
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.button} onPress={() => handleSignIn()}>
					<MyText style={styles.buttonText}>ENTRAR</MyText>
				</TouchableOpacity>

				<View style={styles.linkContainer}>
					<MyText style={styles.linkText}>esqueceu sua senha?</MyText>
					<TouchableOpacity>
						<MyText style={styles.link}> aperte aqui.</MyText>
					</TouchableOpacity>
				</View>

				{/* <MyText style={styles.dividerText}>
					------------- Entre usando -------------
				</MyText>

				<View style={styles.socialContainer}>
					<View style={styles.socialIcon} />
					<View style={styles.socialIcon} />
					<View style={styles.socialIcon} />
				</View> */}

				<View style={styles.createAccountContainer}>
					<MyText>Não tem uma conta?</MyText>
					<TouchableOpacity onPress={() => navigation.navigate("Signin")}>
						<MyText style={styles.link}> Crie aqui.</MyText>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "#F5F5F5",
		alignItems: "center",
	},
	header: {
		width: "100%",
		height: 380,
		backgroundColor: "#406C93",
		borderBottomLeftRadius: 80,
		borderBottomRightRadius: 80,
		alignItems: "center",
		justifyContent: "center",
	},
	logoContainer: {
		marginTop: -70,
	},
	logo: {
		width: 200,
		height: 200,
		resizeMode: "contain",
	},
	loginBox: {
		width: "85%",
		marginTop: -130,
		paddingVertical: 30,
		paddingHorizontal: 20,
		backgroundColor: "#E0E0E0",
		borderRadius: 10,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	loginText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#22465f",
		marginBottom: 20,
	},
	passwordInputContainer: {
		position: "relative",
		width: "100%",
		height: 45,
		marginBottom: 15,
	},
	input: {
		width: "100%",
		height: 45,
		borderColor: "#E0E0E0",
		borderWidth: 1,
		borderRadius: 25,
		paddingLeft: 15,
		marginBottom: 15,
		backgroundColor: "#F9F9F9",
		fontFamily: "Poppins",
	},
	iconButton: {
		position: "absolute",
		right: 10,
		top: 10.5,
	},
	button: {
		width: "75%",
		height: 45,
		backgroundColor: "#406C93",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		marginTop: 10,
	},
	buttonText: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 16,
	},
	linkContainer: {
		flexDirection: "row",
		marginTop: 15,
	},
	linkText: {
		color: "#000000",
	},
	link: {
		color: "#3A5A98",
	},
	dividerText: {
		marginVertical: 20,
		color: "#000000",
		fontSize: 12,
		textAlign: "center",
	},
	socialContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "60%",
	},
	socialIcon: {
		width: 50,
		height: 50,
		backgroundColor: "#c8c8c8",
		borderRadius: 10,
	},
	createAccountContainer: {
		flexDirection: "row",
		marginTop: 15,
	},
});
