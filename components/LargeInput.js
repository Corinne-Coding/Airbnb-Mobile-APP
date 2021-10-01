import React from "react";
import { StyleSheet, TextInput } from "react-native";

// Colors
import colors from "../utils/colors";

function LargeInput({ placeholder, value, setFunction }) {
  return (
    <TextInput
      style={styles.textInput}
      autoCapitalize="sentences"
      autoCorrect={false}
      keyboardType="default"
      maxLength={250}
      multiline
      placeholder={placeholder}
      placeholderTextColor={colors.placeholderColor}
      scrollEnabled
      value={value}
      textAlignVertical="top"
      onChange={(event) => {
        const char = event.nativeEvent.text;
        setFunction(char);
      }}
    ></TextInput>
  );
}

export default LargeInput;

const styles = StyleSheet.create({
  textInput: {
    height: 100,
    width: "80%",
    borderColor: colors.pinkAirbnb,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});
