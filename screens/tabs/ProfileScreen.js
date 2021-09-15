import React, { useContext } from "react";
import { View, Text, Button } from "react-native";

// Context
import { AuthContext } from "../../context";

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ProfileScreen</Text>
      <Button
        title="sugn out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default ProfileScreen;
