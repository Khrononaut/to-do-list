import React from "react";
import "../../stylesheets/header.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return(
            <header>
                <h1>To-do list</h1>
            </header>
        );
    }
}

export { Header };