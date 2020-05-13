import React, {useEffect, useState} from 'react';
import "./App.css";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import {Home} from './pages/Home';
import {Chat} from './pages/Chat';
import {SignUp} from './pages/SignUp';
import {Login} from './pages/Login';
import {auth} from './services/firebase';
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user){
                setAuthenticated(true);
                setLoading(false)
            }
            else {
                setAuthenticated(false);
                setLoading(false)
            }
        })
    }, []);
    if (loading) return <CircularProgress color="secondary" />;
    return (
        <BrowserRouter>
            <Switch>
                <div className="App">
                    <header className="App-header">
                        It's my app
                    </header>
                </div>
                <Route path="/" render={() => <Home/>}/>
                <Route path="/chat" render={() => <Chat/>}/>
                <Route path="/login" render={() => <Login/>}/>
                <Route path="/signUp" render={() => <SignUp/>}/>
                <Route path="*" render={() => <div>404 Not found</div>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
