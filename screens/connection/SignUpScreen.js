import React, { useContext, useState } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Context
import { AuthContext } from "../../context";

const SignUpScreen = () => {
  const { handleToken } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SignUpScreen</Text>

      <Button
        title="signup"
        onPress={() => {
          handleToken("toto");
        }}
      />

      <Button
        title="Go to login"
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      />
    </View>
  );
};

export default SignUpScreen;
