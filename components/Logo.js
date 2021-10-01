import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = ({ withName, size }) => {
  return (
    <Image
      style={
        size === "large"
          ? styles.largeImage
          : size === "medium"
          ? styles.mediumImage
          : size === "small"
          ? styles.smallImage
          : styles.defaultSize
      }
      source={
        withName
          ? require("../assets/images/logo-and-name.jpeg")
          : require("../assets/images/logo.png")
      }
      resizeMode="contain"
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  defaultSize: {
    height: 200,
  },
  largeImage: {
    height: 250,
  },
  mediumImage: {
    height: 80,
    marginTop: 30,
  },
  smallImage: {
    height: 25,
    width: 25,
  },
});
