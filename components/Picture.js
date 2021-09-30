import React from "react";
import { Image, StyleSheet } from "react-native";

const Picture = ({ url, mode }) => {
  return (
    <Image
      style={mode === "circle" ? styles.circle : styles.square}
      source={{ uri: url }}
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
  square: {
    height: 150,
    width: 150,
  },
});
