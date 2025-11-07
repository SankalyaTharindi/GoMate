import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      setTimeout(() => {
        if (isLoggedIn === "true") {
          navigation.replace("MainTabs");
        } else {
          navigation.replace("SignIn");
        }
      }, 2000); // 👈 gives time to show logo
    };
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splash.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>GoMate</Text>
      <ActivityIndicator size="large" color="#4facfe" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4facfe",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
});
