import React from "react";
import { StyleSheet, Text } from "react-native";

// Colors
import colors from "../utils/colors";

const Title = ({ title }) => {
  return (
    <Text style={styles.text} numberOfLines={1}>
      {title}
    </Text>
  );
};

export default Title;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    color: colors.darkGrey,
  },
});
