import React from "react";
import { useContext } from "react";
import "../../stylesheets/header.css";
import { ThemeContext } from "../context/theme";

export default function Header() {
  const { darkMode, toggleMode } = useContext(ThemeContext);
  return (
    <header className={`${darkMode ? "dm" : ""}`}>
      <h1 className={`${darkMode ? "dm" : ""}`}>To-do list</h1>
    </header>
  );
}
