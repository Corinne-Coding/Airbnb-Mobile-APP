import React from "react";
import { StyleSheet, Text } from "react-native";

// Colors
import colors from "../utils/colors";

const SubTitle = ({ title, light }) => {
  return (
    <Text
      style={light === true ? [styles.text, styles.lightColor] : styles.text}
    >
      {title}
    </Text>
  );
};

export default SubTitle;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 28,
    fontWeight: "bold",
    color: colors.darkGrey,
    fontStyle: "italic",
    width: "100%",
  },
  lightColor: {
    color: colors.placeholderColor,
  },
});
