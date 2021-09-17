import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Colors
import colors from "../utils/colors";

// Components
import Logo from "../components/Logo";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo withName />
      <Text style={styles.text}>Clone made by Corinne</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.pinkAirbnb,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 30,
  },
});
