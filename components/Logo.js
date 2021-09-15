import React, { useState, useEffect } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

const Logo = ({ withName }) => {
  return (
    <Image
      style={styles.img}
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
  img: {
    height: 250,
  },
});
