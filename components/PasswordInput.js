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
import colors from "../utils/colors";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PasswordInput = ({
  placeholder,
  setShowPasswordIcon,
  showPasswordIcon,
  value,
  setFunction,
}) => {
  return (
    <View style={styles.passwordView}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholderColor}
        secureTextEntry={!showPasswordIcon}
        style={styles.input}
        value={value}
        onChange={(event) => {
          const char = event.nativeEvent.text;
          setFunction(char);
        }}
      ></TextInput>

      <TouchableOpacity
        onPress={() => {
          setShowPasswordIcon(!showPasswordIcon);
        }}
      >
        <MaterialCommunityIcons
          name={showPasswordIcon ? "eye" : "eye-off"}
          size={20}
          color="grey"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  passwordView: {
    flexDirection: "row",
    marginVertical: 20,
    borderBottomColor: colors.pinkAirbnb,
    borderBottomWidth: 1,
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    height: 30,
    fontSize: 16,
    flex: 1,
  },
});
