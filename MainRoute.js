import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";

import HomeRoute from "./src/screens/Home";
import SettingsRoute from "./src/screens/SettingsRoute";
import ProfileRoute from "./src/screens/Profile";

const MyComponent = () => {
	const [index, setIndex] = React.useState(0);
	let keys = ["home", "settings", "profile"];
	const [routes] = React.useState([
		{
			key: "home",
			title: "Início",
			focused: true,
			focusedIcon: "home-outline",
			unfocusedIcon: "home",
		},
		{
			key: "settings",
			title: "Configurações",
			focusedIcon: "cog-outline",
			unfocusedIcon: "cog",
		},
		{
			key: "profile",
			title: "Perfil",
			focusedIcon: "account-outline",
			unfocusedIcon: "account",
		},
	]);

	const renderScene = BottomNavigation.SceneMap({
		home: HomeRoute,
		settings: SettingsRoute,
		profile: ProfileRoute,
	});

	return (
		<BottomNavigation
			key={[...keys]}
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
			barStyle={{ backgroundColor: "#E6E6E6" }}
			activeIndicatorStyle={{ backgroundColor: "transparent" }}
			activeColor="#3F6B92"
			inactiveColor="#3F6B92"
		/>
	);
};

export default MyComponent;

// import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

// {
//   /* <MaterialCommunityIcons name="home-outline" size={28} color="black" /> */
// }
// {
//   /* <MaterialCommunityIcons name="cog-outline" size={28} color="black" /> */
// }
// {
//   /* <MaterialCommunityIcons name="account-outline" size={28} color="black" /> */
// }

// const Tab = createMaterialBottomTabNavigator();

// export default function MainRoute() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       activeColor="#e91e63"
//       barStyle={{ backgroundColor: "#E6E6E6" }}
//       labeled={false}
//     >
//       <Tab.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons
//               name="cog-outline"
//               size={28}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons
//               name="home-outline"
//               size={28}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons
//               name="account-outline"
//               size={28}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
