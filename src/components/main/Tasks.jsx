import React from "react";
import "../../../stylesheets/main/tasks.css";
import "../../../stylesheets/main/task-creation.css";
import PkmnCard from "./PokemonCard"

export default function Tasks(props) {
  const tasks = props.tasks.map((task, i) => {
    return (
      <li id={`task-no-${i + 1}`}>
        <span>{task}</span>
        <div>
          <i className="fa-solid fa-trash-can" onClick={props.removeTask}></i>
          <span
            className="material-icons-outlined circle"
            onClick={props.checkOffTask}
          >
            circle
          </span>
        </div>
      </li>
    );
  });

  return (
    <div>
      <section className="tasks">
        <ul className="undone-tasks">{tasks}</ul>
        <hr className={props.visibilities.hr} />
        <ul className="done-tasks"></ul>
      </section>
      <section className="task-creation">
        <form className="task-form" onSubmit={props.submitTask}>
          <input
            type="text"
            className="task-input"
            value={props.pendingTask}
            onChange={props.updatePendingTask}
            onInput={props.changeBtnColor}
          />
          <button className="task-btn">
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
    </div>
  );
}
