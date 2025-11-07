import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isDark } = useTheme();

  const handleLogin = () => {
    // simple validation
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    // mock credentials for demo
    if (username === "user" && password === "1234") {
      navigation.replace("MainTabs"); // navigate to main app
    } else {
      Alert.alert("Invalid Login", "Wrong username or password");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#fff" },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isDark ? "#fff" : "#333" },
        ]}
      >
        GoMate Login
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1e1e1e" : "#f2f2f2",
            color: isDark ? "#fff" : "#000",
          },
        ]}
        placeholder="Username"
        placeholderTextColor={isDark ? "#aaa" : "#666"}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1e1e1e" : "#f2f2f2",
            color: isDark ? "#fff" : "#000",
          },
        ]}
        placeholder="Password"
        placeholderTextColor={isDark ? "#aaa" : "#666"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4facfe" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
