import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { TogglePasswordVisibility } from "../components/TogglePasswordVisibility";
import MyText from "../components/MyText";

// Esses são os imports importantes pra você
// Eles servem para o cadastro do usuário
import { auth } from "../firebase/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export default function Sign({ navigation }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // O useEffect é uma função que vai ser disparada sempre que a tela for acessada
  // Esse unsub serve pra autenticar o usuário caso ele já tenha feito login ou se cadastrado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usuario) => {
      if (user || usuario) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
        navigation.navigate("Home");
      }
    });

    unsub();
  }, []);

  const { passwordVisibility, icon, handlePasswordVisibility } =
    TogglePasswordVisibility();
  const {
    passwordVisibility: passwordVisibility2,
    icon: icon2,
    handlePasswordVisibility: handlePasswordVisibility2,
  } = TogglePasswordVisibility();

  // É essa função que vai criar um usuário
  async function handleCreateUser() {
    if (!validateForms()) {
      alert("Preencha todos os campos.");
      return;
    }
    // Aqui eu uso a função do próprio firebase para criar o usuário
    // Todos os dados vem do formulário que eu criei e que o usuário preencheu
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        updateProfile(user.user, { displayName: name });
        setUser({
          email: user.email,
          uid: user.uid,
        });
        navigation.navigate("Home");
      })
      .catch((err) => {
        if (err.code == "auth/invalid-email") alert("EMAIL INVÁLIDO");
        if (err.code == "auth/missing-password") alert("A SENHA É OBRIGATÓRIA");
        if (err.code == "auth/email-already-in-use")
          alert("ESSE EMAIL JÁ ESTÁ SENDO USADO");
      });
  }

  function validateForms() {
    if (name === "") return false;
    if (email === "") return false;
    if (password === "") return false;
    if (confirmPassword === "") return false;
    if (phoneNumber === "") return false;
    return true;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            contentFit="contain"
            style={styles.logo}
          />
        </View>
      </View>

      <View style={styles.loginBox}>
        <MyText style={styles.loginText}>CADASTRO</MyText>

        <TextInput
          placeholder="Nome"
          style={styles.input}
          keyboardType="default"
          placeholderTextColor="#A0A0A0"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />

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

        <View style={styles.passwordInputContainer}>
          <TextInput
            placeholder="Confirme sua senha"
            style={styles.input}
            secureTextEntry={passwordVisibility2}
            minLength={8}
            placeholderTextColor="#A0A0A0"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />
          <TouchableOpacity
            onPress={handlePasswordVisibility2}
            style={styles.iconButton}
          >
            <MaterialCommunityIcons name={icon2} size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Telefone"
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={11}
          placeholderTextColor="#A0A0A0"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleCreateUser();
          }}
        >
          <MyText style={styles.buttonText}>ENTRAR</MyText>
        </TouchableOpacity>

        {/* <MyText style={styles.dividerText}>
					------------- Entre usando -------------
				</MyText>

				<View style={styles.socialContainer}>
					<View style={styles.socialIcon} />
					<View style={styles.socialIcon} />
					<View style={styles.socialIcon} />
				</View> */}

        <View style={styles.createAccountContainer}>
          <MyText>Já possuí uma conta?</MyText>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <MyText style={styles.link}> Clique aqui.</MyText>
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
  link: {
    color: "#3A5Af8",
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
