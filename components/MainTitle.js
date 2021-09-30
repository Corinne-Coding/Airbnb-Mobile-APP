import React from "react";
import { StyleSheet, Text } from "react-native";

// Colors
import colors from "../utils/colors";

const MainTitle = ({ title }) => {
  return <Text style={styles.text}>{title}</Text>;
};

export default MainTitle;

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.darkGrey,
    marginBottom: 15,
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
});
