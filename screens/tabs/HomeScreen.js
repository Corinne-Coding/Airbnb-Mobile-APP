import React, { useCallback, useContext, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

// Contexts
import { UrlApiContext } from "../../context";

// Colors
import colors from "../../utils/colors";

// Components
import PictureAndPrice from "../../components/PictureAndPrice";
import ErrorMessage from "../../components/ErrorMessage";
import LottieView from "../../components/LottieView";
import Picture from "../../components/Picture";
import Title from "../../components/Title";
import Rating from "../../components/Rating";

function RoomsScreen() {
  const navigation = useNavigation();
  const { url } = useContext(UrlApiContext);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [codeError, setCodeError] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setCodeError(0);
        try {
          const response = await axios.get(`${url}rooms`);
          setData(response.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
        } catch (error) {
          setCodeError(7);
          setIsLoading(false);
        }
      };

      fetchData();
    }, [url])
  );

  return isLoading ? (
    <LottieView />
  ) : !data ? (
    <View style={styles.errorContainer}>
      <ErrorMessage codeError={codeError} />
    </View>
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item._id)}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={
            index !== data.length - 1
              ? [styles.item, styles.bottomBorder]
              : [styles.item]
          }
          onPress={() => {
            navigation.navigate("Room", {
              roomId: item._id,
            });
          }}
        >
          <PictureAndPrice url={item.photos[0].url} price={item.price} />
          <View style={styles.detailsView}>
            <View style={styles.textsContainer}>
              <Title title={item.title} />
              <Rating number={item.ratingValue} text={item.reviews} />
            </View>

            <Picture url={item.user.account.photo.url} mode="circle" />
          </View>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
}

export default RoomsScreen;

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: "center",
    backgroundColor: colors.whiteColor,
  },
  item: {
    marginHorizontal: 10,
    position: "relative",
  },
  bottomBorder: {
    borderBottomColor: colors.mediumGrey,
    borderBottomWidth: 1,
    marginBottom: 30,
    paddingBottom: 20,
  },
  detailsView: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textsContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    height: 80,
    paddingRight: 10,
  },
});
