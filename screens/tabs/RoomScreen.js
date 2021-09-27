import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/core";

const RoomScreen = () => {
  const { params } = useRoute();
  console.log(params.roomId);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>RoomScreen</Text>
    </View>
  );
};

export default RoomScreen;
