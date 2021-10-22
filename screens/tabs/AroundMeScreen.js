import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

// Contexts
import { UrlApiContext } from "../../context";

// Components
import ErrorMessage from "../../components/ErrorMessage";

// Colors
import colors from "../../utils/colors";

const AroundMeScreen = () => {
  const navigation = useNavigation();
  const { url } = useContext(UrlApiContext);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [codeError, setCodeError] = useState(0);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const getLocationAndFetchData = async () => {
        console.log("00");
        try {
          setCodeError(0);
          setSelectedRoom(null);
          let response;

          // get permission
          const { status } = await Location.requestForegroundPermissionsAsync();

          if (status === "granted") {
            console.log("01");
            // get location

            let coords;
            if (Platform.OS === "ios") {
              coords = await Location.getCurrentPositionAsync();
            } else {
              coords = await Location.getLastKnownPositionAsync();
            }

            console.log(coords);

            setUserCoordinates({
              latitude: coords.coords.latitude,
              longitude: coords.coords.longitude,
            });

            // get data around user
            console.log("02");
            console.log(
              `${url}rooms/around?latitude=${coords.coords.latitude}&longitude=${coords.coords.longitude}`
            );
            response = await axios.get(
              `${url}rooms/around?latitude=${coords.coords.latitude}&longitude=${coords.coords.longitude}`
            );
          } else {
            console.log("03");
            console.log(`${url}rooms/around`);
            // get all data
            response = await axios.get(`${url}rooms/around`);
          }

          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log("04");
          setCodeError(7);
          setIsLoading(false);
        }
      };

      getLocationAndFetchData();
    }, [])
  );

  const navigate = () => {
    setSelectedRoom(null);
    navigation.navigate("RoomAround", { roomId: selectedRoom.id });
  };

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
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userCoordinates ? userCoordinates.latitude : 48.856614,
          longitude: userCoordinates ? userCoordinates.longitude : 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        {data &&
          data.map((room) => {
            return (
              <MapView.Marker
                key={room._id}
                coordinate={{
                  latitude: room.location[0],
                  longitude: room.location[1],
                }}
                onPress={() => {
                  setSelectedRoom({
                    id: room._id,
                    title: room.title,
                    picture: room.photos[0].url,
                    price: room.price,
                  });
                }}
              />
            );
          })}
      </MapView>

      {selectedRoom && (
        <TouchableHighlight
          style={styles.card}
          underlayColor={colors.lightPinkAirbnb}
          onPress={navigate}
        >
          <>
            <Image
              source={{ uri: selectedRoom.picture }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textsContainer}>
              <Text style={styles.text}>{selectedRoom.title}</Text>
              <Text>{selectedRoom.price} €</Text>
            </View>
          </>
        </TouchableHighlight>
      )}
    </>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    height: "20%",
    width: "90%",
    position: "absolute",
    bottom: 20,
    borderRadius: 10,
    marginHorizontal: "5%",
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textsContainer: {
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: colors.darkGrey,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    height: "100%",
    width: "50%",
    marginRight: 10,
  },
});
