import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../utils/colors";

function IdentificationInput({
  autoCapitalize,
  keyboardType,
  placeholder,
  value,
  setFunction,
}) {
  return (
    <TextInput
      style={styles.textInput}
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor={colors.placeholderColor}
      value={value}
      onChange={(event) => {
        const char = event.nativeEvent.text;
        setFunction(char);
      }}
    ></TextInput>
  );
}

export default IdentificationInput;

const styles = StyleSheet.create({
  textInput: {
    height: 30,
    width: "80%",
    borderBottomColor: colors.pinkAirbnb,
    borderBottomWidth: 1,
    fontSize: 16,
    marginVertical: 20,
  },
});
