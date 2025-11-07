import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <FavouritesProvider>
        <AppNavigator />
      </FavouritesProvider>
    </ThemeProvider>
  );
}
