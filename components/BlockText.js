import React from "react";
import { StyleSheet, Text } from "react-native";

const BlockText = ({ text }) => {
  return <Text style={styles.description}>{text}</Text>;
};

export default BlockText;

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 18,
    textAlign: "justify",
  },
});
