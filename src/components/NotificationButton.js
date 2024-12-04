import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function NotificationButton({ style, nav }) {
	return (
		<>
			<TouchableOpacity style={style} onPress={nav}>
				<MaterialCommunityIcons name="bell" size={28} color="black" />
			</TouchableOpacity>
		</>
	);
}
