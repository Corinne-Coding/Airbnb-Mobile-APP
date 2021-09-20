import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Colors
import colors from "../utils/colors";

const RedirectButton = ({ text, screenName, isRequestLoading }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(screenName);
      }}
      disabled={isRequestLoading ? true : false}
    >
      <Text
        style={[
          styles.text,
          isRequestLoading ? styles.disabled : styles.notDisabled,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default RedirectButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginVertical: 20,
  },
  notDisabled: {
    color: colors.darkGrey,
  },
  disabled: {
    color: colors.greyText,
  },
});
