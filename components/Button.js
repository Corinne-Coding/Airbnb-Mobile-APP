import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

// Colors
import colors from "../utils/colors";

const Button = ({ text, submitFunction, isRequestLoading }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isRequestLoading ? styles.disabled : styles.notDisabled,
      ]}
      onPress={submitFunction}
      disabled={isRequestLoading ? true : false}
    >
      {!isRequestLoading ? (
        <Text style={styles.text}>{text}</Text>
      ) : (
        <ActivityIndicator size="small" color={colors.pinkAirbnb} />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 20,
    minWidth: "50%",
    height: 50,
  },
  disabled: {
    borderColor: colors.greyText,
  },
  notDisabled: {
    borderColor: colors.pinkAirbnb,
  },
  text: {
    color: colors.greyText,
    fontSize: 20,
    fontSize: 18,
  },
});
