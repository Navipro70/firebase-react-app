import React from "react";
import classes from "./Components.module.css"

export const Message = ({message, id, uid}) => {
    if (id === uid) return (
        <div className={classes.my_message}>
            <p>{message}</p>
        </div>
    );
    return (
        <div className={classes.other_user_message}>
            <p>{message}</p>
        </div>
    )
};