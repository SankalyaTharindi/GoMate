import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import { useFavourites } from "../context/FavouritesContext";
import { Platform, StatusBar } from "react-native";

export default function HomeScreen({ navigation }) {
  const { isDark } = useTheme();
  const { favourites, setFavourites } = useFavourites();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(
          "https://my-json-server.typicode.com/SankalyaTharindi/GoMate/destinations"
        );
        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // ✅ Load favourites from AsyncStorage
  useEffect(() => {
    const loadFavourites = async () => {
      const storedFavs = await AsyncStorage.getItem("favourites");
      if (storedFavs) setFavourites(JSON.parse(storedFavs));
      else setFavourites([]);
    };
    loadFavourites();
  }, []);

  // ✅ Toggle favourite
  const toggleFavourite = async (destination) => {
    try {
      const storedFavs = await AsyncStorage.getItem("favourites");
      let favs = storedFavs ? JSON.parse(storedFavs) : [];

      const exists = favs.some((fav) => fav.id === destination.id);
      if (exists) {
        favs = favs.filter((fav) => fav.id !== destination.id);
      } else {
        favs.push(destination);
      }

      await AsyncStorage.setItem("favourites", JSON.stringify(favs));
      setFavourites(favs); // update context
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  };

  // ✅ Check if destination is favourite
  const isFavourite = (id) => favourites.some((fav) => fav.id === id);

  // ✅ Function to get color for status
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#4CAF50"; // green
      case "Upcoming":
        return "#FF9800"; // orange
      case "Popular":
        return "#2196F3"; // blue
      default:
        return "#999";
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#4facfe" />
        <Text style={{ marginTop: 10, color: isDark ? "#ccc" : "#333" }}>
          Loading destinations...
        </Text>
      </View>
    );
  }

  return (
  <View
    style={[
      styles.container,
      { backgroundColor: isDark ? "#121212" : "#fff", 
        paddingTop: Platform.OS === "android" 
        ? StatusBar.currentHeight + 20 // adds dynamic extra space
        : 60, 
      },
    ]}
  >
    <Text style={[styles.pageTitle, { color: isDark ? "#fff" : "#333" }]}>
      Hello, Traveller 👋
    </Text>

    <FlatList
      data={destinations}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1e1e1e" : "#f8f8f8" },
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
          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.route, { color: isDark ? "#fff" : "#333" }]}>
                {item.title}
              </Text>
              <Text
                style={[styles.subtitle, { color: isDark ? "#aaa" : "#888" }]}
              >
                {item.subtitle}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) },
                ]}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => toggleFavourite(item)}>
              <Ionicons
                name={isFavourite(item.id) ? "heart" : "heart-outline"}
                size={26}
                color={isFavourite(item.id) ? "#ff4d4d" : "#aaa"}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18,
    textAlign: "left",
    paddingLeft: 2,
  },
  card: {
    marginBottom: 18,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
  },
  image: { width: "100%", height: 190 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  route: { fontSize: 18, fontWeight: "600" },
  subtitle: { fontSize: 14, marginBottom: 5 },
  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 2,
  },
  statusText: { color: "#fff", fontWeight: "600", fontSize: 12 },
});
