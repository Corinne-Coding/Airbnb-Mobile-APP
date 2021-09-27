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
    color: "#444444",
    paddingRight: 10,
  },
});
