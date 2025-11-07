import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useFavourites } from "../context/FavouritesContext";
import { Platform, StatusBar } from "react-native";

export default function FavouritesScreen() {
  const { isDark } = useTheme();
  const { favourites, removeFavourite } = useFavourites();
  const navigation = useNavigation();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load fresh data for all favourites from API
  useFocusEffect(
    useCallback(() => {
      const fetchUpdatedData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            "https://my-json-server.typicode.com/SankalyaTharindi/GoMate/destinations"
          );
          const data = await response.json();

          // Replace local favourites with fresh API data
          const updated = favourites.map((fav) => {
            const match = data.find((d) => d.id === fav.id);
            return match ? match : fav; // fallback to saved
          });

          setApiData(updated);
        } catch (error) {
          console.error("Error fetching destinations:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUpdatedData();
    }, [favourites])
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#121212" : "#fff" },
        ]}
      >
        <ActivityIndicator size="large" color="#4FACFE" />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#333" }]}>
        Favourites
      </Text>

      {apiData.length === 0 ? (
        <Text style={{ color: isDark ? "#ccc" : "#666", marginTop: 20 }}>
          No favourites added yet.
        </Text>
      ) : (
        <FlatList
  data={apiData}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isDark ? "#1E1E1E" : "#f8f8f8" },
      ]}
      onPress={() =>
        navigation.navigate("Details", { destination: item })
      }
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={[styles.route, { color: isDark ? "#fff" : "#333" }]}>
          {item.title}
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#888" }]}>
          {item.subtitle}
        </Text>
      </View>

      {/* ❤️ & 🗑️ Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { destination: item })}
        >
          <Ionicons name="heart" size={24} color="#FF4C4C" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => removeFavourite(item.id)}
          style={{ marginLeft: 15 }}
        >
          <Ionicons
            name="trash-outline"
            size={24}
            color={isDark ? "#ccc" : "#666"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )}
/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  card: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  info: { flex: 1 },
  route: { fontSize: 18, fontWeight: "600" },
  subtitle: { fontSize: 14 },
  heartButton: { padding: 5 },
  actions: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingRight: 5,
},

});
