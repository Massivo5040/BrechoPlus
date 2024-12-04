import { NavigationContainer } from "@react-navigation/native";

import configuracao from "./settingsScreens/Settings";
import notificacao from "./settingsScreens/Notifications";
import seguranca from "./settingsScreens/Security";
import acessibilidade from "./settingsScreens/Accessibility";
import conta from "./settingsScreens/Account";
import ajuda from "./settingsScreens/Help";
import sobre from "./settingsScreens/About";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function SettingsRoute() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="configuracao"
				component={configuracao}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="notificacao"
				component={notificacao}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="seguranca"
				component={seguranca}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="acessibilidade"
				component={acessibilidade}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="conta"
				component={conta}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="ajuda"
				component={ajuda}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="sobre"
				component={sobre}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
