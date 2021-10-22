import React, { useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const RoomsStack = createNativeStackNavigator();
const AroundStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const TabsStack = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

// Contexts
import { AuthContext } from "./context";
import { UrlApiContext } from "./context";

// Screens
import AroundMeScreen from "./screens/tabs/AroundMeScreen";
import HomeScreen from "./screens/tabs/HomeScreen";
import ProfileScreen from "./screens/tabs/ProfileScreen";
import RoomScreen from "./screens/tabs/RoomScreen";
import SignInScreen from "./screens/connection/SignInScreen";
import SignUpScreen from "./screens/connection/SignUpScreen";
import SplashScreen from "./screens/SplashScreen";

// Components
import Logo from "./components/Logo";

// Icons
import { Entypo, FontAwesome5, FontAwesome } from "@expo/vector-icons";

// Colors
import colors from "./utils/colors";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const urlContext = useMemo(() => {
    return {
      // url: "http://192.168.86.28:3000/", // REACTEUR
      // url: "http://192.168.1.12:3000/", // HOME
      url: "https://airbnb-api-corinne.herokuapp.com/",
    };
  });

  const authContext = useMemo(() => {
    return {
      handleToken: async (token) => {
        if (token) {
          await SecureStore.setItemAsync("airbnb-user-token", token);
          setUserToken(token);
        } else {
          await SecureStore.deleteItemAsync("airbnb-user-token");
          setUserToken(null);
        }
      },

      handleId: async (id) => {
        if (id) {
          await SecureStore.setItemAsync("airbnb-user-id", id);
          setUserId(id);
        } else {
          await SecureStore.deleteItemAsync("airbnb-user-id");
          setUserId(null);
        }
      },
    };
  }, []);

  useEffect(() => {
    const checkValuesInSecureStore = async () => {
      const token = await SecureStore.getItemAsync("airbnb-user-token");
      const id = await SecureStore.getItemAsync("airbnb-user-id");
      setUserToken(token);
      setUserId(id);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    checkValuesInSecureStore();
  }, []);

  // Clear Secure Store
  useEffect(() => {
    const clearSecureStore = async () => {
      await SecureStore.deleteItemAsync("airbnb-user-token");
      await SecureStore.deleteItemAsync("airbnb-user-id");
      setUserToken(null);
      setUserId(null);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    clearSecureStore();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  const screenOptionsObj = {
    headerTitle: () => <Logo size="small" />,
    headerTitleAlign: "center",
    headerBackTitle: "",
    headerTintColor: colors.darkGrey,
  };

  const AuthStackScreen = () => (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );

  const TabsStackScreen = () => (
    <TabsStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.pinkAirbnb,
        tabBarInactiveTintColor: colors.greyText,
      }}
    >
      <TabsStack.Screen
        name="Home"
        component={RoomsStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <TabsStack.Screen
        name="AroundMe"
        component={AroundStackScreen}
        options={{
          tabBarLabel: "Around me",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marker-alt" size={size} color={color} />
          ),
        }}
      />

      <TabsStack.Screen
        name="ProfileScreen"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </TabsStack.Navigator>
  );

  const RoomsStackScreen = () => {
    return (
      <RoomsStack.Navigator screenOptions={screenOptionsObj}>
        <RoomsStack.Screen name="Rooms" component={HomeScreen} />
        <RoomsStack.Screen name="Room" component={RoomScreen} />
      </RoomsStack.Navigator>
    );
  };

  const AroundStackScreen = () => {
    return (
      <AroundStack.Navigator screenOptions={screenOptionsObj}>
        <AroundStack.Screen name="Map" component={AroundMeScreen} />
        <AroundStack.Screen name="RoomAround" component={RoomScreen} />
      </AroundStack.Navigator>
    );
  };

  const ProfileStackScreen = () => {
    return (
      <ProfileStack.Navigator screenOptions={screenOptionsObj}>
        <ProfileStack.Screen name="Profile">
          {() => <ProfileScreen userId={userId} userToken={userToken} />}
        </ProfileStack.Screen>
      </ProfileStack.Navigator>
    );
  };

  return (
    <UrlApiContext.Provider value={urlContext}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {userToken ? <TabsStackScreen /> : <AuthStackScreen />}
        </NavigationContainer>
      </AuthContext.Provider>
    </UrlApiContext.Provider>
  );
};

export default App;
