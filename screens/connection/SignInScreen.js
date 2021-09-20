import React, { useContext, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";

// Context
import { AuthContext } from "../../context";

// Colors
import colors from "../../utils/colors";

// Components
import ScreenTitle from "../../components/ScreenTitle";
import Logo from "../../components/Logo";
import IdentificationInput from "../../components/IdentificationInput";
import PasswordInput from "../../components/PasswordInput";
import ErrorMessage from "../../components/ErrorMessage";
import ConnectionButton from "../../components/ConnectionButton";
import RedirectButton from "../../components/RedirectButton";

const SignInScreen = () => {
  const { handleToken, handleId } = useContext(AuthContext);

  const [email, setEmail] = useState("eric@gmail.com");
  const [password, setPassword] = useState("passss");
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [codeError, setCodeError] = useState(1);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const handleSubmit = async () => {
    if (email && password) {
      // check if fields are filled
      setCodeError(0);
      setIsRequestLoading(true);
      try {
        // request
        const response = await axios.post("http://localhost:3000/user/log_in", {
          email: email,
          password: password,
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
        if (error.response.status === 401) {
          setCodeError(3);
        } else {
          setCodeError(5);
        }
      }
    } else {
      setCodeError(1);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <StatusBar style="dark" backgroundColor={colors.whiteColor} />

        <View style={styles.view}>
          <Logo withName={false} size="medium" />
          <ScreenTitle text="Log in" />
        </View>

        <View style={styles.view}>
          <IdentificationInput
            autoCapitalize="none"
            placeholder="email"
            keyboardType="email-address"
            value={email}
            setFunction={setEmail}
          />
          <PasswordInput
            placeholder="password"
            showPasswordIcon={showPasswordIcon}
            value={password}
            setShowPasswordIcon={setShowPasswordIcon}
            setFunction={setPassword}
          />
        </View>

        <View style={styles.view}>
          <ErrorMessage codeError={codeError} />
          <ConnectionButton
            text="Log in"
            submitFunction={handleSubmit}
            isRequestLoading={isRequestLoading}
          />
          <RedirectButton
            text="No account ? Register"
            screenName="SignUp"
            isRequestLoading={isRequestLoading}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.whiteColor,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    paddingBottom: 30,
    flex: 1,
    justifyContent: "space-between",
  },
  view: {
    width: "100%",
    alignItems: "center",
  },
});
