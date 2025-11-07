import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Watch for currentUser changes (after login/logout)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("currentUser");
        if (userData) {
          const user = JSON.parse(userData);
          setCurrentUser(user.username);
        } else {
          setCurrentUser(null);
          setFavourites([]); // clear on logout
        }
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    loadUser();

    // Re-run when user logs in/out
    const interval = setInterval(loadUser, 1000); 
    return () => clearInterval(interval);
  }, []);

  // ✅ Load favourites whenever currentUser changes
  useEffect(() => {
    const loadFavourites = async () => {
      if (!currentUser) {
        setFavourites([]);
        return;
      }

      try {
        const stored = await AsyncStorage.getItem(`favourites_${currentUser}`);
        if (stored) setFavourites(JSON.parse(stored));
        else setFavourites([]);
      } catch (err) {
        console.error("Error loading favourites:", err);
      }
    };

    loadFavourites();
  }, [currentUser]);

  // ✅ Save favourites when they change
  useEffect(() => {
    const saveFavourites = async () => {
      if (currentUser) {
        await AsyncStorage.setItem(
          `favourites_${currentUser}`,
          JSON.stringify(favourites)
        );
      }
    };
    saveFavourites();
  }, [favourites, currentUser]);

  // ✅ Core actions
  const addFavourite = (destination) => {
    setFavourites((prev) => {
      if (prev.some((fav) => fav.id === destination.id)) return prev;
      return [...prev, destination];
    });
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavourite = (id) => favourites.some((fav) => fav.id === id);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourite,
        setFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
