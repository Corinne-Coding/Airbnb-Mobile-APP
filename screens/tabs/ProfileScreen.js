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

const ProfileScreen = ({ userId, userToken }) => {
  const { handleId, handleToken } = useContext(AuthContext);
  const { url } = useContext(UrlApiContext);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [codeError, setCodeError] = useState(0);
  const [userPicture, setUserPicture] = useState(null);
  const [userName, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Get data about user
      const fetchData = async () => {
        setCodeError(1);
        try {
          const response = await axios.get(`${url}users/${userId}`);
          setData(response.data);
          if (response.data.account.photo.url) {
            setUserPicture(response.data.account.photo.url);
          }
          setName(response.data.account.name);
          setUsername(response.data.account.username);
          setDescription(response.data.account.description);
          setIsLoading(false);
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
      setCodeError(5);
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
      setCodeError(5);
      return;
    }
  };

  const removePicture = () => {
    setUserPicture(null);
  };

  const updateInformations = async () => {
    setIsUpdateLoading(true);
    try {
      setCodeError(0);
      // create FormData
      const formData = new FormData();
      if (userPicture) {
        const uriParts = userPicture.split(".");
        const fileType = uriParts[uriParts.length - 1];
        formData.append("picture", {
          uri: userPicture,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      formData.append("description", description);
      formData.append("username", userName);
      formData.append("name", name);

      // options for request
      const options = {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + userToken,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      // request
      const response = await fetch(`${url}user/update/${userId}`, options);

      const JSONResponse = await response.json();
      setData(JSONResponse);
      if (JSONResponse.account.photo.url) {
        setUserPicture(JSONResponse.account.photo.url);
      }
      setName(JSONResponse.account.name);
      setUsername(JSONResponse.account.username);
      setDescription(JSONResponse.account.description);
      setIsUpdateLoading(false);
    } catch (e) {
      setCodeError(7);
      setIsUpdateLoading(false);
    }
  };

  const logOut = () => {
    handleId();
    handleToken();
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
          value={name}
          keyboardType="default"
          setFunction={setName}
        />

        <View style={styles.subTitleContainer}>
          <SubTitle title="username" light={true} />
        </View>
        <IdentificationInput
          noMargin={true}
          value={userName}
          keyboardType="default"
          setFunction={setUsername}
        />

        <View style={styles.subTitleContainer}>
          <SubTitle title="description" light={true} />
        </View>
        <LargeInput
          noMargin={true}
          value={description}
          setFunction={setDescription}
        />
      </View>

      <ErrorMessage codeError={codeError} />
      <Button
        text="Update informations"
        submitFunction={updateInformations}
        isRequestLoading={isUpdateLoading}
      />
      <Button text="Sign out" submitFunction={logOut} />
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
    marginBottom: 20,
  },
  subTitleContainer: {
    width: "80%",
    marginTop: 40,
  },
});
