import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme";
import PkmnCard from "./PokemonCard";
import "../../../stylesheets/main/tasks.css";
import "../../../stylesheets/main/task-creation.css";

export default function Tasks(props) {
  const { darkMode, toggleMode } = useContext(ThemeContext);
  const tasks = props.tasks.map((task, i) => {
    return (
      <li id={`task-no-${i + 1}`} className={`task-item ${darkMode ? "dm" : ""}`}>
        <span className={`task-content ${darkMode ? "dm" : ""}`}>{task}</span>
        <div className={`task-btn-ctr ${darkMode ? "dm" : ""}`}>
          <i className={`fa-solid fa-trash-can task-delete-btn ${darkMode ? "dm" : ""}`} onClick={props.removeTask}></i>
          <span
            className={`material-icons-outlined circle ${darkMode ? "dm" : ""}`}
            onClick={props.checkOffTask}
          >
            circle
          </span>
        </div>
      </li>
    );
  });
// className={`${darkMode ? "dm" : ""}`}
  return (
    <>
      <section className={`tasks ${darkMode ? "dm" : ""}`}>
        <ul className="undone-tasks">{tasks}</ul>
        <hr className={`${props.visibilities.hr} ${darkMode ? "dm" : ""}`} />
        <ul className="done-tasks"></ul>
      </section>
      <section className={`task-creation ${darkMode ? "dm" : ""}`}>
        <form className={`task-form ${darkMode ? "dm" : ""}`} onSubmit={props.submitTask}>
          <input
            type="text"
            className={`task-input ${darkMode ? "dm" : ""}`}
            value={props.pendingTask}
            onChange={props.updatePendingTask}
            onInput={props.changeBtnColor}
          />
          <button className={`task-btn ${darkMode ? "dm" : ""}`}>
            <i className="material-icons">add_task</i>
          </button>
        </form>
      </section>
      <PkmnCard
        discard={props.discardPkmnCard}
        allowedToDisplay={props.allowedToDisplay}
        fetchPkmnData={props.fetchPkmnData}
        name={props.name}
        imgUrl={props.imgUrl}
        desc={props.desc}
        types={props.types}
      />
    </>
  );
}
