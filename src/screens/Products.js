import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import MyText from "../components/MyText";
import NotificationButton from "../components/NotificationButton";
import BigCard from "../components/BigCard";

// Os imports importantes
// link da documentação para o addDoc()
// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=pt-br#web
import { auth, db } from "../firebase/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";

export default function Products({ navigation }) {
  const [roupas, setRoupas] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  async function getDados() {
    const docRef = collection(db, "Vestuario");

    getDocs(docRef)
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          if (doc.data().dono == user.displayName) {
            lista.push({
              id: doc.id,
              title: doc.data().nome,
              img: doc.data().imagem,
              price: doc.data().preco,
              interested: doc.data().interessados,
            });
          }
        });
        setRoupas(lista);
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
          style={styles.selectedItem}
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
          data={roupas}
          renderItem={({ item }) => (
            <BigCard
              title={item.title}
              img={item.img}
              name={item.interested + " interessados"}
              others={item.price}
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
