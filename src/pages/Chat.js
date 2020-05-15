import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {auth} from "../services/firebase";
import {db} from "../services/firebase"

export const Chat = ({authenticated}) => {
    const [messages, setMessages] = useState([]);
    const [user, changeUser] = useState(null);
    const [error, throwError] = useState('');
    useEffect(() => {
        try {
            changeUser(auth().currentUser);
            db.ref("content").on("value", snapshot => {
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
    if (!authenticated) return <Redirect to="/login"/>;
    return (
        <div>
            <div className="chats">
                {messages.map(chat => {
                    console.log(new Date(chat.timestamp).getUTCDate());
                    return <p key={chat.timestamp}>{chat.content} {new Date(chat.timestamp).toTimeString()}</p>
                })}
            </div>
            <div>
                Login in as: <strong>{user? user.email : 'error'}</strong>
            </div>
        </div>
    )
};