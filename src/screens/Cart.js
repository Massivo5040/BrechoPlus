import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Notifications from "expo-notifications";

import MyText from "../components/MyText";
import CartElement from "../components/CartElement";
import NotificationButton from "../components/NotificationButton";
import { CartContext } from "../contexts/CartContext";

// Os imports importantes
// link da documentação para o addDoc()
// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=pt-br#web
// link da documentação para o getDoc()
// https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br#web_4
import { auth, db } from "../firebase/firebaseConnection";
import { addDoc, collection, getDocs } from "firebase/firestore";

export default function Cart({ navigation }) {
  // Para fazer o carrinho de compras, eu usei um hook chamado context do react native
  // links para pesquisa:
  // https://react.dev/reference/react/useContext
  // https://www.freecodecamp.org/portuguese/news/react-context-para-iniciantes-o-guia-completo/
  // https://www.w3schools.com/react/react_usecontext.asp
  const {
    cart,
    addItemCart,
    calcTotalPrice,
    eraseCart,
    notificationList,
    addNotification,
  } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState("");
  // Aqui eu estou pegando os dados do usuário que está logado
  const user = auth.currentUser;

  useEffect(() => {
    const hoje = new Date();

    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();

    setDate(`${dia}/${mes}/${ano}`);
    setTotal(calcTotalPrice(cart));
  }, []);

  // Aqui eu crio uma referência para uma coleção
  const docRef = collection(db, "Historico");
  // Essa função serve para criar um documento em uma coleção específica
  const createHistory = async (data) => {
    // A função addDoc() precisa da referência da coleção que vai ser criado o documento
    // E também precisa dos dados desse documento, que deve ser um objeto {}
    addDoc(docRef, data)
      .then(() => alert("Histórico criado com sucesso!"))
      .catch((err) => console.log(err));
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Compra realizada com sucesso!",
        body: `Sua compra no valor de R$${total} foi aprovada.`,
      },
      trigger: { seconds: 2 },
    });
    addNotification({
      content: {
        title: "Compra realizada com sucesso",
        body: `Sua compra no valor de R$${total} foi aprovada.`,
      },
    });
  }

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
          style={styles.navItem}
          onPress={() => navigation.navigate("Products")}
        >
          <MaterialCommunityIcons name="tag-outline" size={24} color="black" />
          <MyText style={styles.navText}>Produtos</MyText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectedItem}
          onPress={() => navigation.navigate("Cart")}
        >
          <MaterialCommunityIcons name="cart-outline" size={24} color="black" />
          <MyText style={styles.navText}>Carrinho</MyText>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.categoryContainer}
        data={cart}
        renderItem={({ item }) => <CartElement data={item} />}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.priceContainer}>
        <View style={styles.totalPrice}>
          <MyText style={styles.totalPriceText}>Preço total:</MyText>
          <MyText style={styles.totalPriceText}>
            R${Number(total).toFixed(2)}
          </MyText>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={async () => {
            if (cart.length == 0) {
              alert(
                "Não há nada no seu carrinho\nColoque algo nele antes de confirmar a compra"
              );
              return;
            }
            setTotal(calcTotalPrice(cart));
            const compras = cart.map((product) => product.name);
            const prices = cart.map((product) => product.price);
            const imgs = cart.map((product) => product.img);
            // Aqui você pode ver que eu estou chamando a função que eu criei
            // como parâmetro eu coloquei os dados do documento que seria adicionado
            createHistory({
              pagador: user.displayName,
              compras: [...compras],
              precos: [...prices],
              imagens: [...imgs],
              total: total.toFixed(2),
              data: date,
            });
            schedulePushNotification();
            eraseCart();
          }}
        >
          <MyText style={styles.confirmButtonText}>Confirmar compra</MyText>
        </TouchableOpacity>
      </View>
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
  categoryContainer: {
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
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
    width: "95%",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  priceContainer: {
    borderColor: "#000",
    borderWidth: 1.5,
  },
  totalPrice: {
    padding: 15,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPriceText: {
    fontSize: 18,
  },
  confirmButton: {
    width: "80%",
    marginHorizontal: "auto",
    marginBottom: 8,
    backgroundColor: "#22C73A",
    padding: 10,
    borderRadius: 10,
  },
  confirmButtonText: {
    textAlign: "center",
    color: "white",
  },
});
