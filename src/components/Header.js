import React from "react";
import {auth} from '../services/firebase';
import {NavLink} from "react-router-dom";
import "../App.css";
import Button from "@material-ui/core/Button";

export const Header = ({user, setAuthenticated}) => {
    const handleLogout = () => {
        setAuthenticated(false);
        auth().signOut();
    };
    if (user) return (
        <div className="App">
            <header className="App-header">
                <img src={user.photoURL} alt=""/>
                <span>{user.email}</span>
                <Button variant="contained" onClick={handleLogout}>Logout</Button>
            </header>
        </div>
    );
    return (
        <div className="App">
            <header className="App-header">
                    <NavLink to="/signUp">SignUp</NavLink>
                    <NavLink to="login">Login</NavLink>
            </header>
        </div>
    )
};