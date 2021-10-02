import React from "react";
import { Image, StyleSheet } from "react-native";

// Colors
import colors from "../utils/colors";

const Picture = ({ url, mode }) => {
  return (
    <Image
      style={
        mode === "circle"
          ? styles.circle
          : mode === "small square"
          ? styles.smallSquare
          : styles.largeSquare
      }
      source={
        url !== "default"
          ? { uri: url }
          : require("../assets/images/default-user.jpg")
      }
      resizeMethod="scale"
    />
  );
};

export default Picture;

const styles = StyleSheet.create({
  circle: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  smallSquare: {
    height: 150,
    width: 150,
  },
  largeSquare: {
    height: 200,
    width: 200,
    borderColor: colors.mediumGrey,
    borderWidth: 1,
  },
});
