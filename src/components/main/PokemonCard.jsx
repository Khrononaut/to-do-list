import React from "react";
import { useEffect } from "react";
import "../../../stylesheets/main/pkmn.css";

export default function PkmnCard(props) {
    useEffect(() => {
      props.fetchPkmnData();
    }, []);
  
    return (
      <div className="pkmn-background invisible">
        <button className="discard-btn invisible" onClick={props.discard}>
          <i className="fa-regular fa-circle-xmark fa-5x"></i>
        </button>
        <p className="congratulation invisible">
          Congratulations! 🎉 {"\n"}
          You've caught this Pokémon.
        </p>
        <article className="pkmn-card invisible">
          <div className="top-div">
            <img src={props.imgUrl} />
            <div className="sub-div">
              <p className="pkmn-name">{props.name}</p>
              <div className="type-ctr">
                <span className="pkmn-type">{props.types[0]}</span>
                {props.types[1] && (
                  <span className="pkmn-type">{props.types[1]}</span>
                )}
              </div>
            </div>
          </div>
          <div className="bottom-div">
            <p className="pkmn-desc">{props.desc}</p>
            <button className="pkmn-link-btn">
              <a href={`https://duckduckgo.com/?q=${props.name}`}>
                search the web
              </a>
            </button>
          </div>
        </article>
      </div>
    );
  }