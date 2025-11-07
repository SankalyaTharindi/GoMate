import React, { useState } from "react";
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

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isDark } = useTheme();

  const handleSignUp = async () => {
  if (!username || !password) {
    Alert.alert("Error", "Please fill in both fields");
    return;
  }

  try {
    const storedUsers = await AsyncStorage.getItem("users");
    let users = storedUsers ? JSON.parse(storedUsers) : [];

    if (!Array.isArray(users)) {
      users = [];
    }

    if (users.some((u) => u.username === username)) {
      Alert.alert("Error", "Username already exists!");
      return;
    }

    const newUser = { username, password };
    const updatedUsers = [...users, newUser];

    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

    Alert.alert("Success", "Account created successfully!", [
      { text: "OK", onPress: () => navigation.replace("SignIn") },
    ]);
  } catch (error) {
    console.error("Signup error:", error);
  }
};


  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: isDark ? "#fff" : "#333" }]}>Create Account</Text>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDark ? "#1e1e1e" : "#f2f2f2", color: isDark ? "#fff" : "#000" },
        ]}
        placeholder="Choose a username"
        placeholderTextColor={isDark ? "#aaa" : "#666"}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDark ? "#1e1e1e" : "#f2f2f2", color: isDark ? "#fff" : "#000" },
        ]}
        placeholder="Choose a password"
        placeholderTextColor={isDark ? "#aaa" : "#666"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={[styles.link, { color: "#4facfe" }]}>
          Already have an account? Sign in
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
