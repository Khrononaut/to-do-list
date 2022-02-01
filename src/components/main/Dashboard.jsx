import React from "react";
import "../../../stylesheets/main/dashboard.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme";

const DashboardElement = (props) => {
  const { darkMode, toggleMode } = useContext(ThemeContext);
  return (
    <section
      className={`dashboard-component ${props.sectionClassName} ${(darkMode ? "dm" : "")}`}
      onClick={props.onClick}
    >
      <i className={`fa-solid fa-2xl fa-${props.iClassName}`}></i>
      <span>{props.spanText}</span>
    </section>
  );
};

export default function Dashboard(props) {
  const { darkMode, toggleMode } = useContext(ThemeContext);
  return (
    <section className={`dashboard ${darkMode ? "dm" : ""}`}>
      <DashboardElement
        onClick={props.removeAllTasks}
        sectionClassName="deleteAll"
        iClassName="trash-can"
        spanText="Delete all"
      />
      <DashboardElement
        onClick={props.checkOffAllTasks}
        sectionClassName="checkOffAll"
        iClassName="check-double"
        spanText="Check of All"
      />
      <DashboardElement
        onClick={props.resetAllTasks}
        sectionClassName="resetAll"
        iClassName="rotate-left"
        spanText="Reset all"
      />
      <DashboardElement
        onClick={toggleMode}
        sectionClassName="toggleDarkMode"
        iClassName="circle-half-stroke"
        spanText="Toggle dark mode"
      />
    </section>
  );
}
