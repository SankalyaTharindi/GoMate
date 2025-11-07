import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";

export default function LoadingScreen({ navigation }) {
  const { isDark } = useTheme();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          navigation.replace("MainTabs");
        } else {
          navigation.replace("SignIn");
        }
      } catch (error) {
        console.error(error);
        navigation.replace("SignIn");
      }
    };

    checkLogin();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#fff" },
      ]}
    >
      <ActivityIndicator size="large" color="#4facfe" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
