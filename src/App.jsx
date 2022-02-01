import React from "react";
import { useState } from "react";
import "../stylesheets/style.css";
import { ThemeContext } from "./context/theme";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => {
    setDarkMode((prevState) => !prevState);
  };
  const value = { darkMode, toggleMode };

  return (
    <ThemeContext.Provider value={value}>
      <div>
        <Header />
        <Main />
      </div>
    </ThemeContext.Provider>
  );
}
