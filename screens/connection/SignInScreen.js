import React, { useContext, useState } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Context
import { AuthContext } from "../../context";

const SignInScreen = () => {
  const { handleToken } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SignInScreen</Text>
      <Button
        title="log in"
        onPress={() => {
          handleToken("toto");
        }}
      />

      <Button
        title="Go to signup"
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      />
    </View>
  );
};

export default SignInScreen;
