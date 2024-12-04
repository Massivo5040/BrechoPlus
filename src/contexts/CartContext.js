import React, { useState, createContext } from "react";

export const CartContext = createContext({});

function CartProvider({ children }) {
	const [cart, setCart] = useState([]);
	const [notificationList, setNotificationList] = useState([]);

	function addNotification(newNotification) {
		setNotificationList([...notificationList, newNotification]);
	}

	function addItemCart(newItem) {
		const indexItem = cart.findIndex((item) => item.id === newItem.id);

		if (indexItem != -1) {
			let cartList = cart;

			cartList[indexItem].amount += 1;

			cartList[indexItem].total =
				cartList[indexItem].amount * cartList[indexItem].price;

			setCart(cartList);
			return;
		}

		let data = {
			...newItem,
			amount: 1,
			total: newItem.price,
		};

		setCart((products) => [...products, data]);
	}

	function removeItemCart(item) {
		const indexItem = cart.indexOf(item);

		if (indexItem == -1) {
			console.log("temos um problema");
		}

		let cartList = cart;

		item.amount -= 1;

		item.total = item.amount * item.price;

		cartList.splice(indexItem, 1, item);
		setCart(cartList);
	}

	function calcTotalPrice(products) {
		let precoTotal = 0;
		products.forEach((e) => {
			precoTotal += Number(e.total);
		});
		return precoTotal;
	}

	function eraseCart() {
		setCart([]);
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				addItemCart,
				calcTotalPrice,
				removeItemCart,
				eraseCart,
				notificationList,
				addNotification,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export default CartProvider;
