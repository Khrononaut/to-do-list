import React from "react";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/theme";
import "../../stylesheets/main.css";
import Dashboard from "./main/Dashboard";
import Tasks from "./main/Tasks";

export default function Main() {
  const [pendingTask, setPendingTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [allowedToCheckOff, setCheckOffAllowance] = useState(true);
  const [visibilities, setVisibilities] = useState({
    hr: "undisplayed",
    pkmnCard: "invisible",
  });
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [types, setTypes] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [allowedToDisplay, setDisplayAllowance] = useState(true);
  const { darkMode, toggleMode } = useContext(ThemeContext);

  const doneTasks = document.querySelector(".done-tasks");
  const undoneTasks = document.querySelector(".undone-tasks");
  const horizontalRule = document.querySelector("hr");
  const taskBtn = document.querySelector(".task-btn");
  const pkmnCard = document.querySelector(".pkmn-card");
  const pkmnBgd = document.querySelector(".pkmn-background");
  const discardBtn = document.querySelector(".discard-btn");
  const congratulation = document.querySelector(".congratulation");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pendingTask.length !== 0) {
      setTasks((prevVal) => prevVal.concat(pendingTask));
      setPendingTask("");
    }
    if (doneTasks.hasChildNodes()) {
      setVisibilities({
        ...visibilities,
        hr: "displayed",
      });
    }
    taskBtn.classList.remove("inputNotEmpty");
  };

  const handleChange = (e) => {
    setPendingTask(e.target.value);
  };

  const removeTask = (e) => {
    document
      .querySelector(`.${e.target.parentNode.parentNode.parentNode.className}`)
      .removeChild(e.target.parentNode.parentNode);

    if (!undoneTasks.hasChildNodes() || !doneTasks.hasChildNodes()) {
      setVisibilities({
        ...visibilities,
        hr: "undisplayed",
      });
    }
  };

  const removeAllTasks = () => {
    doneTasks.innerHTML = "";
    undoneTasks.innerHTML = "";
    horizontalRule.classList.remove("displayed");
    horizontalRule.classList.add("undisplayed");
  };

  const checkOffTask = (e) => {
    if (!allowedToCheckOff) return;
    setCheckOffAllowance(false);

    e.target.parentNode.parentNode.classList.toggle("checkedOff");
    e.target.parentNode.parentNode.children[0].classList.toggle("crossedOut");

    if (
      e.target.parentNode.parentNode.parentNode.className === "undone-tasks"
    ) {
      e.target.innerText = "task_alt";
      doneTasks.appendChild(e.target.parentNode.parentNode);
      setDisplayAllowance(true);
      fetchPkmnData();
      togglePkmnCard("display");
    } else {
      e.target.innerText = "circle";
      undoneTasks.appendChild(e.target.parentNode.parentNode);
      setCheckOffAllowance(true);
    }

    if (doneTasks.hasChildNodes() && undoneTasks.hasChildNodes()) {
      setVisibilities({
        ...visibilities,
        hr: "displayed",
      });
    } else {
      setVisibilities({
        ...visibilities,
        hr: "undisplayed",
      });
    }
  };

  const changeBtnColor = (e) => {
    if (e.target.value !== "") {
      taskBtn.classList.add("inputNotEmpty");
    } else {
      taskBtn.classList.remove("inputNotEmpty");
    }
  };

  const checkOffAllTasks = () => {
    for (let i = undoneTasks.childNodes.length - 1; i >= 0; i = i - 1) {
      undoneTasks.children[i].classList.add("checkedOff");
      undoneTasks.children[i].children[1].children[1].innerText = "task_alt";
      doneTasks.appendChild(undoneTasks.childNodes[i]);
    }
    horizontalRule.classList.remove("displayed");
    horizontalRule.classList.add("undisplayed");
    setDisplayAllowance(true);
    fetchPkmnData();
    togglePkmnCard("display");
    setTimeout(() => {
      pkmnCard.classList.remove("invisible");
    }, 500);
  };

  const resetAllTasks = () => {
    for (let i = doneTasks.childNodes.length - 1; i >= 0; i = i - 1) {
      doneTasks.children[i].children[1].children[1].innerText = "circle";
      doneTasks.children[i].classList.remove("checkedOff");
      undoneTasks.appendChild(doneTasks.childNodes[i]);
    }

    horizontalRule.classList.remove("displayed");
    horizontalRule.classList.add("undisplayed");
  };

  const fetchPkmnData = () => {
    if (!allowedToDisplay) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 493)}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setImgUrl(data.sprites.front_default);
        setTypes([data.types[0].type.name]);
        if (data.types.length > 1) {
          setTypes((prevArray) => [...prevArray, data.types[1].type.name]);
        }
        return data.species.url;
      })
      .then((speciesUrl) => {
        fetch(speciesUrl)
          .then((response) => response.json())
          .then((data) => {
            setDesc(
              data["flavor_text_entries"][0]["flavor_text"].replace(
                /(\n)/g,
                " "
              )
            );
          });
      });
  };

  const togglePkmnCard = (action) => {
    if (action === "display") {
      setTimeout(() => {
        pkmnBgd.classList.remove("invisible");
        pkmnBgd.classList.add("dimmed");
        discardBtn.classList.remove("invisible");
        congratulation.classList.remove("invisible");
        pkmnCard.classList.remove("invisible");
      }, 500);
    } else {
      setTimeout(() => {
        pkmnBgd.classList.add("invisible");
        pkmnBgd.classList.remove("dimmed");
        discardBtn.classList.add("invisible");
        congratulation.classList.add("invisible");
        pkmnCard.classList.add("invisible");
      }, 500);
    }
  };

  const discardPkmnCard = () => {
    togglePkmnCard();
    setCheckOffAllowance(true);
  };

  return (
    <main className={`${darkMode ? "dm" : ""}`}>
      <Dashboard
        removeAllTasks={removeAllTasks}
        checkOffAllTasks={checkOffAllTasks}
        resetAllTasks={resetAllTasks}
      />
      <Tasks
        tasks={tasks}
        pendingTask={pendingTask}
        submitTask={handleSubmit}
        updatePendingTask={handleChange}
        checkOffTask={checkOffTask}
        removeTask={removeTask}
        discardPkmnCard={discardPkmnCard}
        allowedToDisplay={allowedToDisplay}
        changeBtnColor={changeBtnColor}
        visibilities={visibilities}
        fetchPkmnData={fetchPkmnData}
        name={name}
        imgUrl={imgUrl}
        desc={desc}
        types={types}
      />
    </main>
  );
}
