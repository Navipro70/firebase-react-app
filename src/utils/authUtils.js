import {auth} from "firebase";

export const signIn = (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password)
};

export const login = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password)
};