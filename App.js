// In App.js in a new project

import React, { useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

// Context
import { AuthContext } from "./context";

// Connection screens
import SignInScreen from "./screens/connection/SignInScreen";
import SignUpScreen from "./screens/connection/SignUpScreen";

// Tabs screens
import HomeScreen from "./screens/tabs/HomeScreen";
import ProfileScreen from "./screens/tabs/ProfileScreen";
import FavoritesScreen from "./screens/tabs/FavoritesScreen";
import RoomScreen from "./screens/tabs/RoomScreen";
import AroundMeScreen from "./screens/tabs/AroundMeScreen";

// Other Screens
import SplashScreen from "./screens/SplashScreen";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("toto");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("toto");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  const AuthStackScreen = () => (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );

  const TabsScreen = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={RoomsStackScreen} />
      <Tab.Screen name="Around me" component={AroundMeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );

  const RoomsStackScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Rooms" component={HomeScreen} />
        <Stack.Screen name="Room" component={RoomScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? <TabsScreen /> : <AuthStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
