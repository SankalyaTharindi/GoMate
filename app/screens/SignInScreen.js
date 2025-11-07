import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isDark } = useTheme();

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        navigation.replace("MainTabs");
      }
    };
    checkLogin();
  }, []);

  const handleSignIn = async () => {
  if (!username || !password) {
    Alert.alert("Error", "Please fill in both fields");
    return;
  }

  try {
    const storedUsers = await AsyncStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    if (!Array.isArray(users)) {
      Alert.alert("Error", "User data corrupted. Please recreate your account.");
      return;
    }

    const matchedUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (matchedUser) {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("currentUser", JSON.stringify(matchedUser));
      navigation.replace("MainTabs");
    } else {
      Alert.alert("Invalid Login", "Wrong username or password");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: isDark ? "#fff" : "#333" }]}>Sign In</Text>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDark ? "#1e1e1e" : "#f2f2f2", color: isDark ? "#fff" : "#000" },
        ]}
        placeholder="Username"
        placeholderTextColor={isDark ? "#aaa" : "#666"}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDark ? "#1e1e1e" : "#f2f2f2", color: isDark ? "#fff" : "#000" },
        ]}
        placeholder="Password"
        placeholderTextColor={isDark ? "#aaa" : "#666"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={[styles.link, { color: "#4facfe" }]}>
          Don’t have an account? Create one
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 30 },
  input: { width: "100%", padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  button: { width: "100%", backgroundColor: "#4facfe", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { marginTop: 15, fontSize: 16 },
});
