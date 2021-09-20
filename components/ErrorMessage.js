import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Colors
import colors from "../utils/colors";

function ErrorMessage({ codeError }) {
  // Codes errors :
  // 0 : no error
  // 1 : empty field(s)
  // 2 : password !== confirmPassword
  // 3 : wrong email or password
  // 4 : email format
  // 5 : generic error response
  const generateTextMessage = () => {
    if (typeof codeError === "string") {
      return codeError;
    } else {
      switch (codeError) {
        case 0:
          return "";
        case 1:
          return "Please fill all the fields";
        case 2:
          return "Passwords must be the same";
        case 3:
          return "Incorrect credentials";
        case 4:
          return "Wrong email format";
        case 5:
          return "An error occurred";
        case 6:
          return "Your password must be at least 6 characters long";
      }
    }
  };

  return (
    <View style={styles.errorView}>
      <Text style={styles.text}>{generateTextMessage()}</Text>
    </View>
  );
}

export default ErrorMessage;

const styles = StyleSheet.create({
  errorView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 50,
    marginHorizontal: 20,
    width: "80%",
  },
  text: {
    color: colors.pinkAirbnb,
    textAlign: "center",
  },
});
