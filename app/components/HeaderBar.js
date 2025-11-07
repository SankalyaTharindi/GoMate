import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function HeaderBar({ title }) {
  const { isDark } = useTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: isDark ? "#121212" : "#fff",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 60,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 2,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: isDark ? "#fff" : "#222",
            textAlign: "left",
            marginLeft: 10,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingBottom: 15,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
