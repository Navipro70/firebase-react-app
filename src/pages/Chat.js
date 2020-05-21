import React, {useEffect, useState} from "react";
import '../App.css'
import classes from "./Common.module.css";
import {Redirect} from "react-router-dom";
import {db} from "../services/firebase"
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {SnackbarError} from "../components/Snackbar";
import {Message} from "../components/Message";

export const Chat = ({authenticated, user, unsubscribe}) => {
    const [messages, setMessages] = useState([]);
    const [error, throwError] = useState('');
    const [newMessage, changeMessage] = useState('');
    useEffect(() => {
        try {
            db.ref("chat/1_2").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                setMessages(chats);
            });
        } catch (error) {
            throwError(error);
        }
    }, []);
    useEffect(unsubscribe, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await db.ref("chat/1_2").push({
                message: newMessage,
                timestamp: Date.now(),
                uid: user.uid
            });
            changeMessage('');
        } catch (error) {
            throwError(error.message);
        }
    };
    if (!authenticated) return <Redirect to="/login"/>;
    return (
        <div>
            <div className="Chat-main">
                {messages.map(chat => <Message key={chat.timestamp}
                                               uid={user.uid}
                                               id={chat.uid}
                                               message={chat.message} />)}
            </div>
            <div >
                <form className={classes.chat__form} onSubmit={handleSubmit}>
                    <Input type="text" value={newMessage} onChange={(e) => changeMessage(e.target.value)}/>
                    <div>
                        <Button variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!Boolean(newMessage)}>Send message</Button>
                    </div>
                </form>
            </div>
            <SnackbarError errorMessage={error} opened={Boolean(error)} />
        </div>
    )
};