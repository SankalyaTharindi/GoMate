import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DetailsScreen from "../screens/DetailsScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoadingScreen from "../screens/LoadingScreen";
import SplashScreen from "../screens/SplashScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* 🏠 Home stack with details */
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

/* ❤️ Favourites stack with details */
function FavouritesStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="FavouritesMain" component={FavouritesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

/* 👇 Main bottom tab */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "HomeTab") iconName = "home";
          else if (route.name === "FavouritesTab") iconName = "heart";
          else if (route.name === "Profile") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4facfe",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="FavouritesTab"
        component={FavouritesStack}
        options={{ title: "Favourites" }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/* 🌐 Root navigator (with Splash, Auth & Tabs) */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
