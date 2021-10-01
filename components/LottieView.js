import React from "react";
import { StyleSheet, View } from "react-native";

// Lottie from "https://airbnb.design/lottie/"
import LottieView from "lottie-react-native";

export default class App extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            width: 150,
            height: 150,
          }}
          source={require("../assets/lottie/4389-pt-white-house.json")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
