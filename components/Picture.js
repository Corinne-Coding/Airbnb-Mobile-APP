import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

const Picture = ({ url }) => {
  return (
    <Image style={styles.image} source={{ uri: url }} resizeMethod="scale" />
  );
};

export default Picture;

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});
