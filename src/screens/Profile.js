import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

import MyText from "../components/MyText";
import NotificationButton from "../components/NotificationButton";
import { useNavigation } from "@react-navigation/native";
import { getAuth, updateProfile } from "firebase/auth";

export default function PerfScreen() {
  const [image, setImage] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    if (user.photoURL) setImage(user.photoURL);
  }, []);

  // Essa função pode ser útil caso no seu aplicativo tenha uma foto de perfil
  // Ela lança um pedido pra escolher uma imagem e depois altera no aplicativo e no firebase
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      //
      updateProfile(user, { photoURL: result.assets[0].uri });
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}>
            <Image
              style={styles.img}
              source={
                image
                  ? { uri: image }
                  : require("../../assets/template-icon.png")
              }
            />
          </View>
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => pickImage()}
          >
            <MaterialCommunityIcons name="camera" size={44} color="black" />
          </TouchableOpacity>
        </View>
        <NotificationButton
          style={styles.iconContainer}
          nav={() => navigation.navigate("NotificationScreen")}
        />
        <MyText style={styles.username}>{user.displayName}</MyText>
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateClothe")}
      >
        <MyText style={styles.addButtonText}>Adicionar Roupa</MyText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    backgroundColor: "#3E5E9A",
    height: 230,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    backgroundColor: "#6C88C4",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "150",
    height: "150",
    borderRadius: 75,
  },
  cameraIcon: {
    position: "absolute",
    bottom: -10,
    right: -20,
    backgroundColor: "#6C88C4",
    padding: 5,
    borderRadius: 15,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  username: {
    fontSize: 18,
    color: "white",
    marginTop: 15,
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
  addButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "#DCDE58",
    alignSelf: "flex-end",
    padding: 15,
    borderRadius: 10,
  },
  addButtonText: {},
});
