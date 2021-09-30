import React, { useEffect, useState, useContext } from "react";
import {
  Dimensions,
  Image,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import Swiper from "react-native-swiper";
import MapView from "react-native-maps";

// Contexts
import { UrlApiContext } from "../../context";

// Components
import BlockText from "../../components/BlockText";
import ErrorMessage from "../../components/ErrorMessage";
import MainTitle from "../../components/MainTitle";
import Picture from "../../components/Picture";
import Price from "../../components/Price.js";
import Rating from "../../components/Rating";
import SubTitle from "../../components/SubTitle";
import Title from "../../components/Title";

// Colors
import colors from "../../utils/colors";

const RoomScreen = () => {
  const {
    params: { roomId },
  } = useRoute();
  const { url } = useContext(UrlApiContext);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [codeError, setCodeError] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setCodeError(0);
      try {
        const response = await axios.get(`${url}rooms/${roomId}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setCodeError(7);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={colors.pinkAirbnb}
      style={{ paddingTop: 20 }}
    />
  ) : !data ? (
    <View style={styles.errorContainer}>
      <ErrorMessage codeError={codeError} />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <MainTitle title={data.title} />

        <View style={{ height: 300 }}>
          <Swiper
            showsButtons={false}
            horizontal={true}
            showsPagination={true}
            activeDotColor={colors.pinkAirbnb}
            dotStyle={{ width: 10, height: 10, borderRadius: 5 }}
            activeDotStyle={{ width: 10, height: 10, borderRadius: 5 }}
          >
            {data.photos.map((photo) => {
              return (
                <Image
                  key={photo.picture_id}
                  style={styles.swiperImage}
                  source={{ uri: photo.url }}
                />
              );
            })}
          </Swiper>
        </View>

        <Price price={data.price} />

        <View style={styles.detailsContainer}>
          <Title title="About the accommodation" />
          <BlockText text={data.description} />
          <Rating text={data.reviews} number={data.ratingValue} color="dark" />
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: data.location[0],
            longitude: data.location[1],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: data.location[0],
              longitude: data.location[1],
            }}
            title={data.title}
          />
        </MapView>

        <View style={styles.detailsContainer}>
          <Title title="About the landlord" />

          <View style={styles.userContainer}>
            <Picture url={data.user.account.photo.url} />
            <View style={styles.texts}>
              <View>
                <SubTitle title="Name" />
                <Text>{data.user.account.name}</Text>
              </View>
              <View>
                <SubTitle title="Username" />
                <Text>{data.user.account.username}</Text>
              </View>
            </View>
          </View>

          <BlockText text={data.user.account.description} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  scrollView: {
    alignItems: "center",
  },
  errorContainer: {
    alignItems: "center",
  },
  swiperImage: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  detailsContainer: {
    marginTop: 50,
    marginBottom: 15,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  userContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  texts: {
    marginLeft: 20,
    justifyContent: "space-evenly",
  },
  map: {
    width: Dimensions.get("window").width - 20,
    height: 200,
    marginTop: 10,
  },
});
