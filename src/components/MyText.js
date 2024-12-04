import { View, Text } from "react-native";

export default function MyText({ style, children }) {
  return (
    <>
      <Text style={[{ fontSize: 16, fontFamily: "Poppins" }, style]}>
        {children}
      </Text>
    </>
  );
}
