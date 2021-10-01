import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Icons
import { Entypo } from "@expo/vector-icons";

// Colors
import colors from "../utils/colors";

function Rating({ number, text, color }) {
  const generateStars = (number) => {
    let starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < number) {
        starsArray.push(
          <Entypo name="star" size={22} color="#DAA520" key={i} />
        );
      } else {
        starsArray.push(<Entypo name="star" size={22} color="grey" key={i} />);
      }
    }
    return starsArray;
  };

  return (
    <View style={styles.ratingView}>
      <View style={styles.starIcons}>{generateStars(number)}</View>
      <Text style={color === "dark" ? styles.dark : styles.light}>
        {text} reviews
      </Text>
    </View>
  );
}

export default Rating;

const styles = StyleSheet.create({
  starIcons: {
    flexDirection: "row",
    paddingRight: 10,
  },
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
  },
  light: {
    color: colors.greyText,
  },
  dark: {
    color: colors.black,
  },
});
