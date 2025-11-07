import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function ProfileScreen({ navigation }) {
  const { isDark, toggleTheme } = useTheme();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("currentUser");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUsername(user.username);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      await AsyncStorage.removeItem("currentUser");
      navigation.replace("SignIn");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#fff" },
      ]}
    >
      <View style={styles.profileContainer}>
        <Ionicons
          name="person-circle-outline"
          size={100}
          color="#4facfe"
        />
        <Text style={[styles.username, { color: isDark ? "#fff" : "#333" }]}>
          {username ? username : "Guest"}
        </Text>
      </View>

      {/* ✅ Dark Mode Toggle with improved background */}
      <View
        style={[
          styles.themeRow,
          {
            backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
            borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
          },
        ]}
      >
        <Ionicons
          name={isDark ? "moon" : "sunny"}
          size={24}
          color={isDark ? "#FFD700" : "#4facfe"}
        />
        <Text style={[styles.themeText, { color: isDark ? "#fff" : "#333" }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: "#ccc", true: "#4facfe" }}
          thumbColor={isDark ? "#fff" : "#f4f3f4"}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  username: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 30,
  },
  themeText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF4C4C",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
