import React from "react";
import {NavLink} from "react-router-dom";
import "../App.css";

export const Header = () => {
    return (
        <div className="App">
            <header className="App-header">
                    <NavLink to="/signUp">SignUp</NavLink>
                    <NavLink to="login">Login</NavLink>
            </header>
        </div>
    )
};