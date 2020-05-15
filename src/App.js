import React, {useEffect, useState} from 'react';
import "./App.css";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import {Home} from './pages/Home';
import {Chat} from './pages/Chat';
import {SignUp} from './pages/SignUp';
import {Login} from './pages/Login';
import {auth} from './services/firebase';
import CircularProgress from "@material-ui/core/CircularProgress";
import {Header} from "./components/Header";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setAuthenticated(true);
                setLoading(false)
            } else {
                setAuthenticated(false);
                setLoading(false)
            }
        })
    }, []);
    if (loading) return <CircularProgress color="secondary"/>;
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/" exact render={() => <Home/>}/>
                <Route path="/chat" render={(rest) => <Chat {...rest} authenticated={authenticated}/>}/>
                <Route path="/login" render={(rest) => <Login {...rest} authenticated={authenticated}/>}/>
                <Route path="/signUp" render={(rest) => <SignUp {...rest} authenticated={authenticated}/>}/>
                <Route path="*" render={() => <div>404 Not found</div>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
