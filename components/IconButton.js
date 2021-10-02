import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Icons
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

// Colors
import colors from "../utils/colors";

const IconButton = ({ type, handleFunction }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleFunction}>
      {type === "camera" ? (
        <FontAwesome5 name="camera" size={30} color={colors.darkGrey} />
      ) : type === "gallery" ? (
        <MaterialIcons name="photo-library" size={30} color={colors.darkGrey} />
      ) : (
        <Entypo name="circle-with-cross" size={30} color={colors.darkGrey} />
      )}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
