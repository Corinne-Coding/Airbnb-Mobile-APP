import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

const PictureAndPrice = ({ url, price }) => {
  return (
    <ImageBackground
      style={styles.image}
      source={{ uri: url }}
      resizeMethod="scale"
    >
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price} €</Text>
      </View>
    </ImageBackground>
  );
};

export default PictureAndPrice;

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: Dimensions.get("window").width - 20,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  priceContainer: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginLeft: -20,
  },
  price: {
    color: "white",
    fontSize: 20,
  },
});
