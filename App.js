import "./gesture-handler.native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import MainRoute from "./MainRoute";
import IntroductionScreen from "./src/screens/Introduction";
import Introduction2Screen from "./src/screens/Introduction2";
import LoginScreen from "./src/screens/Login";
import SigninScreen from "./src/screens/Signin";
import CardScreen from "./src/screens/CardScreen";
import BigCardScreen from "./src/screens/BigCardScreen";
import Cart from "./src/screens/Cart";
import History from "./src/screens/History";
import Products from "./src/screens/Products";
import Ongs from "./src/screens/Ongs";
import CreateClothe from "./src/screens/CreateClothe";
import NotificationScreen from "./src/screens/NotificationScreen";

import CartProvider from "./src/contexts/CartContext";
import BigCard from "./src/components/BigCard";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
	const [loaded, error] = useFonts({
		Poppins: require("./src/fonts/Poppins_400Regular.ttf"),
		"Poppins-Italic": require("./src/fonts/Poppins_400Regular_Italic.ttf"),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<NavigationContainer>
			<CartProvider>
				<Stack.Navigator initialRouteName="Introduction">
					<Stack.Screen
						name="Home"
						component={MainRoute}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Introduction"
						component={IntroductionScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Introduction2"
						component={Introduction2Screen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Signin"
						component={SigninScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Cart"
						component={Cart}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="History"
						component={History}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Products"
						component={Products}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Ongs"
						component={Ongs}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="CardScreen"
						component={CardScreen}
						options={{ headerShown: true, title: "Roupa" }}
					/>
					<Stack.Screen
						name="BigCardScreen"
						component={BigCardScreen}
						options={{ headerShown: true, title: "Ong" }}
					/>
					<Stack.Screen
						name="CreateClothe"
						component={CreateClothe}
						options={{ headerShown: true, title: "Coloque sua roupa à venda" }}
					/>
					<Stack.Screen
						name="NotificationScreen"
						component={NotificationScreen}
						options={{ headerShown: true, title: "Notificações" }}
					/>
				</Stack.Navigator>
			</CartProvider>
		</NavigationContainer>
	);
}
