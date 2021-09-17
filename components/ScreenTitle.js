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

// Colors
import colors from "../utils/colors";

const ScreenTitle = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default ScreenTitle;

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkGrey,
  },
});
