import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Colors
import colors from "../utils/colors";

const ConnectionButton = ({ text, submitFunction }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={submitFunction}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ConnectionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: colors.pinkAirbnb,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginVertical: 20,
  },
  text: {
    color: colors.greyText,
    fontSize: 20,
    fontSize: 18,
  },
});
