/* eslint-disable react/prop-types */
import React from "react";
import useLocalStorage from "./use-local-storage";

const ThemeContext = React.createContext();

export const ThemeProvider = ({ themeStorageKey = "theme", children }) => {
  const [theme, setTheme] = useLocalStorage(themeStorageKey, null);
  const switchTheme = (newTheme) => {
    // eslint-disable-next-line no-undef
    const root = document.body;
    root.classList.remove(theme);
    root.classList.add(newTheme);
    setTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
