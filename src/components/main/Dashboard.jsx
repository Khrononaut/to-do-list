import React from "react";
import "../../../stylesheets/main/dashboard.css";


const DashboardElement = (props) => {
  return (
    <section
        className={`dashboard-component ${props.sectionClassName}`}
        onClick={props.onClick}
      >
        <i className={`fa-solid fa-2xl fa-${props.iClassName}`}></i>
        <span>{props.spanText}</span>
      </section>
  );
};

export default function Dashboard(props) {
  return (
    <section className="dashboard">
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
          sectionClassName="toggleDarkMode"
          iClassName="circle-half-stroke"
          spanText="Toggle dark mode"
        />
      </section>
  );
}