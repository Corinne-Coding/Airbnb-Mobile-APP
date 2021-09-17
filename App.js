import React, { useState, useMemo, useEffect } from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const RoomsStack = createNativeStackNavigator();
const TabsStack = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const LodgingStack = createNativeStackNavigator();

// Context
import { AuthContext } from "./context";

// Screens
import SignInScreen from "./screens/connection/SignInScreen";
import SignUpScreen from "./screens/connection/SignUpScreen";
import HomeScreen from "./screens/tabs/HomeScreen";
import ProfileScreen from "./screens/tabs/ProfileScreen";
import FavoritesScreen from "./screens/tabs/FavoritesScreen";
import RoomScreen from "./screens/tabs/RoomScreen";
import AroundMeScreen from "./screens/tabs/AroundMeScreen";
import LodgingsScreen from "./screens/tabs/LodgingsScreen";
import UpdateLodgingScreen from "./screens/tabs/UpdateLodgingScreen";
import SplashScreen from "./screens/SplashScreen";

// Other Packages
import * as SecureStore from "expo-secure-store";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

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
    const checkTokenInSecureStore = async () => {
      const result = await SecureStore.getItemAsync("airbnb-user-token");
      console.log("TOKEN IN SECURE STORE =>", result);
      setUserToken(result);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    checkTokenInSecureStore();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

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
    <TabsStack.Navigator screenOptions={{ headerShown: false }}>
      <TabsStack.Screen name="Home" component={RoomsStackScreen} />
      <TabsStack.Screen name="AroundMe" component={AroundStackScreen} />
      <TabsStack.Screen name="Favorites" component={FavoritesScreen} />
      <TabsStack.Screen name="Lodgings" component={LodgingStackScreen} />
      <TabsStack.Screen name="Profile" component={ProfileScreen} />
    </TabsStack.Navigator>
  );

  const RoomsStackScreen = () => {
    return (
      <RoomsStack.Navigator>
        <RoomsStack.Screen name="Rooms" component={HomeScreen} />
        <RoomsStack.Screen name="Room" component={RoomScreen} />
      </RoomsStack.Navigator>
    );
  };

  const AroundStackScreen = () => {
    return (
      <RoomsStack.Navigator>
        <RoomsStack.Screen name="Map" component={AroundMeScreen} />
        <RoomsStack.Screen name="RoomAround" component={RoomScreen} />
      </RoomsStack.Navigator>
    );
  };

  const LodgingStackScreen = () => {
    return (
      <LodgingStack.Navigator>
        <LodgingStack.Screen name="List" component={LodgingsScreen} />
        <LodgingStack.Screen name="Update" component={UpdateLodgingScreen} />
      </LodgingStack.Navigator>
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? <TabsStackScreen /> : <AuthStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
