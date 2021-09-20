import React, { useContext, useState } from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";

// Contexts
import { AuthContext } from "../../context";
import { UrlApiContext } from "../../context";

// Colors
import colors from "../../utils/colors";

// Components
import ScreenTitle from "../../components/ScreenTitle";
import Logo from "../../components/Logo";
import IdentificationInput from "../../components/IdentificationInput";
import LargeInput from "../../components/LargeInput";
import PasswordInput from "../../components/PasswordInput";
import ErrorMessage from "../../components/ErrorMessage";
import ConnectionButton from "../../components/ConnectionButton";
import RedirectButton from "../../components/RedirectButton";

// Functions
import validateEmailFormat from "../../utils/functions/validateEmailFormat";

const SignUpScreen = () => {
  const { handleToken, handleId } = useContext(AuthContext);
  const { url } = useContext(UrlApiContext);

  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordIcon1, setShowPasswordIcon1] = useState(false);
  const [showPasswordIcon2, setShowPasswordIcon2] = useState(false);
  const [codeError, setCodeError] = useState(1);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const handleSubmit = async () => {
    // check if fields are filled
    if (
      email &&
      password &&
      confirmPassword &&
      userName &&
      name &&
      description
    ) {
      // check email format :
      const boolean = validateEmailFormat(email);
      if (boolean) {
        // check password length
        if (password.length >= 6) {
          // check password & confirmPassword
          if (password === confirmPassword) {
            setCodeError(0);
            setIsRequestLoading(true);
            try {
              // request
              const response = await axios.post(`${url}user/sign_up`, {
                email,
                username: userName,
                name,
                description,
                password,
              });

              if (response.data.token && response.data._id) {
                handleToken(response.data.token);
                handleId(response.data._id);
              } else {
                setCodeError(5);
              }
              setIsRequestLoading(false);
            } catch (error) {
              setIsRequestLoading(false);
              if (
                error.response.data.error ===
                  "This email already has an account." ||
                error.response.data.error ===
                  "This username already has an account."
              ) {
                setCodeError(error.response.data.error);
              } else {
                setCodeError(5);
              }
            }
          } else {
            setCodeError(2);
          }
        } else {
          setCodeError(6);
        }
      } else {
        setCodeError(4);
      }
    } else {
      setCodeError(1);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <StatusBar style="dark" backgroundColor={colors.whiteColor} />

        <Logo withName={false} size="medium" />

        <ScreenTitle text="Sign up" />

        <IdentificationInput
          autoCapitalize="none"
          placeholder="email"
          keyboardType="email-address"
          value={email}
          setFunction={setEmail}
        />

        <IdentificationInput
          autoCapitalize="sentences"
          placeholder="name"
          keyboardType="default"
          value={name}
          setFunction={setName}
        />

        <IdentificationInput
          autoCapitalize="none"
          placeholder="username"
          keyboardType="default"
          value={userName}
          setFunction={setUsername}
        />

        <LargeInput
          placeholder="Introduce yourself in a few words"
          value={description}
          setFunction={setDescription}
        />

        <PasswordInput
          placeholder="password"
          showPasswordIcon={showPasswordIcon1}
          value={password}
          setShowPasswordIcon={setShowPasswordIcon1}
          setFunction={setPassword}
        />

        <PasswordInput
          placeholder="confirm password"
          showPasswordIcon={showPasswordIcon2}
          value={confirmPassword}
          setShowPasswordIcon={setShowPasswordIcon2}
          setFunction={setConfirmPassword}
        />

        <ErrorMessage codeError={codeError} />

        <ConnectionButton
          text="Sign up"
          submitFunction={handleSubmit}
          isRequestLoading={isRequestLoading}
        />

        <RedirectButton
          text="Already have an account ? Log in"
          screenName="SignIn"
          isRequestLoading={isRequestLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.whiteColor,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    paddingBottom: 30,
  },
});
