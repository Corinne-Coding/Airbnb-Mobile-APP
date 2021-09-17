import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Colors
import colors from "../utils/colors";

const RedirectButton = ({ text, screenName }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(screenName);
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RedirectButton;

const styles = StyleSheet.create({
  text: {
    color: colors.darkGrey,
    fontSize: 14,
    marginVertical: 20,
  },
});
