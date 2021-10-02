import React, { useCallback, useContext, useState } from "react";
import { ActivityIndicator, View, ScrollView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

// Context
import { AuthContext, UrlApiContext } from "../../context";

// Components
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import IconButton from "../../components/IconButton";
import IdentificationInput from "../../components/IdentificationInput";
import LargeInput from "../../components/LargeInput";
import Picture from "../../components/Picture";
import SubTitle from "../../components/SubTitle";

// Colors
import colors from "../../utils/colors";

const ProfileScreen = ({ userId }) => {
  const { handleId, handleToken } = useContext(AuthContext);
  const { url } = useContext(UrlApiContext);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [codeError, setCodeError] = useState(0);
  const [userPicture, setUserPicture] = useState(null);
  const [userName, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setCodeError(0);
        try {
          // console.log(`${url}users/${userId}`);
          const response = await axios.get(`${url}users/${userId}`);

          setData(response.data);
          setIsLoading(false);
          setUserPicture(response.data.account.photo);
        } catch (error) {
          setCodeError(7);
          setIsLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const handleCamera = async () => {
    try {
      let isPermissionGranted = await ImagePicker.getCameraPermissionsAsync();

      if (isPermissionGranted.status !== "granted") {
        isPermissionGranted = await ImagePicker.requestCameraPermissionsAsync();
      }

      if (isPermissionGranted.status === "granted") {
        const pickerResult = await ImagePicker.launchCameraAsync();
        setUserPicture(pickerResult.uri);
      } else return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleGallery = async () => {
    try {
      let isPermissionGranted =
        await ImagePicker.getMediaLibraryPermissionsAsync();

      if (isPermissionGranted.status !== "granted") {
        isPermissionGranted =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      if (isPermissionGranted.status === "granted") {
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        setUserPicture(pickerResult.uri);
      } else return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const removePicture = () => {
    setUserPicture(null);
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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.pictureContainer}>
        <Picture url={userPicture ? userPicture : "default"} mode="square" />

        <View style={styles.buttonsContainer}>
          <IconButton type="camera" handleFunction={handleCamera} />
          <IconButton type="gallery" handleFunction={handleGallery} />
          <IconButton type="remove" handleFunction={removePicture} />
        </View>
      </View>

      <View style={styles.inputsContainer}>
        <View style={styles.subTitleContainer}>
          <SubTitle title="name" light={true} />
        </View>
        <IdentificationInput
          noMargin={true}
          value={data.account.name}
          // keyboardType="default"
          // setFunction={setName}
        />

        <View style={styles.subTitleContainer}>
          <SubTitle title="username" light={true} />
        </View>
        <IdentificationInput
          noMargin={true}
          value={data.account.username}
          // keyboardType="default"
          // setFunction={setUsername}
        />

        <View style={styles.subTitleContainer}>
          <SubTitle title="description" light={true} />
        </View>
        <LargeInput
          noMargin={true}
          value={data.account.description}
          // setFunction={setDescription}
        />
      </View>

      <Button text="Update informations" />
      <Button text="Sign out" />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    backgroundColor: colors.whiteColor,
    paddingVertical: 30,
  },
  pictureContainer: {
    flexDirection: "row",
  },
  buttonsContainer: {
    justifyContent: "space-around",
    marginLeft: 20,
  },
  inputsContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 50,
  },
  subTitleContainer: {
    width: "80%",
    marginTop: 40,
  },
});
