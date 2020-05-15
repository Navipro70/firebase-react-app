import {auth} from "firebase";

export const signUp = (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password)
};

export const login = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password)
};

export const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
};