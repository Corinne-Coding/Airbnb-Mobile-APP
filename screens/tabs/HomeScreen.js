import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Room screen"
        onPress={() => {
          navigation.navigate("Room");
        }}
      />
    </View>
  );
};

export default HomeScreen;
