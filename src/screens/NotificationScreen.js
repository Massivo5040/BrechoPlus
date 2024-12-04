import React, { useEffect, useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import NotificationCard from "../components/NotificationCard";
import { CartContext } from "../contexts/CartContext";
import MyText from "../components/MyText";

export default function NotificationScreen() {
	const { notificationList } = useContext(CartContext);

	return (
		<View style={styles.container}>
			{notificationList.length == 0 ? (
				<MyText style={{ textAlign: "center", fontSize: 24 }}>
					Sem notificações para carregar...
				</MyText>
			) : (
				<FlatList
					contentContainerStyle={styles.categoryContainer}
					data={notificationList}
					renderItem={({ item }) => <NotificationCard data={item} />}
					keyExtractor={(item) => 1 + Math.floor(Math.random() * 100)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	categoryContainer: {
		gap: 20,
	},
});
