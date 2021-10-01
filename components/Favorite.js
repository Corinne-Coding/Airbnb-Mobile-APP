import React from "react";
import { StyleSheet, View } from "react-native";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

const Favorite = () => {
  return (
    <View style={styles.star}>
      <MaterialIcons name="star-border" size={30} color="black" />
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  star: {
    // position: "absolute",
    // top: 20,
    // right: 20,
    // zIndex: 2,
    // borderRadius: 20,
    // backgroundColor: "white",
    // height: 40,
    // width: 40,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
