import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Colors
import colors from "../utils/colors";

const Price = ({ price }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.largeText, styles.text]}>{price} €</Text>
      <Text style={[styles.smallText, styles.text]}> / night</Text>
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  largeText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    color: colors.black,
  },
  smallText: {
    fontSize: 14,
  },
});
