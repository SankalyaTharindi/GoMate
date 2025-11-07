import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useFavourites } from "../context/FavouritesContext";
import { Platform, StatusBar } from "react-native";

export default function DetailsScreen({ route, navigation }) {
  const { destination } = route.params;
  const { isDark } = useTheme();
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fav = isFavourite(destination.id);

  // Fetch route data from JSON API
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // Trim and encode URL to avoid spaces
        const from = encodeURIComponent(destination.title.split("→")[0].trim());
        const to = encodeURIComponent(destination.title.split("→")[1].trim());

        const res = await fetch(
          `https://my-json-server.typicode.com/SankalyaTharindi/GoMate/routes?from=${from}&to=${to}`
        );

        const data = await res.json();
        setRouteData(data?.[0] || null);
      } catch (error) {
        console.error("Error fetching routes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [destination.title]);

  // Toggle favourite using context
  const toggleFavourite = () => {
    if (fav) removeFavourite(destination.id);
    else addFavourite(destination);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#fff" },
      ]}
    >
      {/* Header Bar */}
      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? "#1E1E1E" : "#F9F9F9" },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={26}
            color={isDark ? "#fff" : "#333"}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#333" }]}>
          {destination.title.split("→")[1].trim()}
        </Text>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons
            name={fav ? "heart" : "heart-outline"}
            size={26}
            color={fav ? "#FF4C4C" : isDark ? "#aaa" : "#888"}
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView>
        <Image
  source={
    typeof destination?.image === "string"
      ? { uri: destination.image }
      : destination?.image || { uri: "https://via.placeholder.com/600x400?text=No+Image" }
  }
  style={styles.image}
  resizeMode="cover"
/>

        <View style={styles.content}>
          <Text style={[styles.title, { color: isDark ? "#fff" : "#333" }]}>
            {destination.title}
          </Text>

          <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>
            {destination.subtitle}
          </Text>

          <Text
            style={[styles.description, { color: isDark ? "#ddd" : "#444" }]}
          >
            {destination.description ||
              "Explore this beautiful destination known for its breathtaking views and cultural heritage."}
          </Text>

          {/* Route Info */}
          <View style={{ marginTop: 25 }}>
            <Text
              style={[styles.sectionTitle, { color: isDark ? "#fff" : "#333" }]}
            >
              Available Routes:
            </Text>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#4FACFE"
                style={{ marginTop: 20 }}
              />
            ) : routeData?.routes?.length ? (
              routeData.routes.map((r, index) => (
                <View
                  key={index}
                  style={[
                    styles.routeCard,
                    {
                      backgroundColor:
                        r.mode === routeData.recommended
                          ? isDark
            ? "#2B3A48" // darker blue for dark mode
            : "#E8F6FF" // soft blue for light mode
          : isDark
            ? "#1E1E1E"
            : "#F2F2F2",
                    },
                  ]}
                >
                  <Ionicons
                    name={r.mode === "bus" ? "bus" : "train"}
                    size={22}
                    color="#4FACFE"
                    style={{ marginRight: 10 }}
                  />
                  <View>
                    <Text
                      style={[
                        styles.routeText,
                        { color: isDark ? "#fff" : "#333" },
                      ]}
                    >
                      {r.mode.toUpperCase()} — {r.duration} ({r.price})
                    </Text>
                    {r.mode === routeData.recommended && (
                      <Text style={{ color: "#4FACFE", fontWeight: "600" }}>
                        Most Convenient
                      </Text>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <Text
                style={{
                  color: isDark ? "#999" : "#555",
                  marginTop: 15,
                  fontStyle: "italic",
                }}
              >
                No route data available for this destination.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
   },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 4,
  },
  backButton: { 
    padding: 5, 
  },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  image: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 16, marginTop: 4 },
  description: { fontSize: 16, marginTop: 15, lineHeight: 22 },
  sectionTitle: { fontSize: 18, marginTop: 10, fontWeight: "600" },
  routeCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  routeText: { fontSize: 16, fontWeight: "500" },
});
