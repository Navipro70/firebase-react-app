import firebase from "firebase";

const config = {
    apiKey: "AIzaSyB-R-pH76EOKyagkF4qNzWHEii9xA-bWAs",
    authDomain: "chat-app-f97d5.firebaseapp.com",
    databaseURL: "https://chat-app-f97d5.firebaseio.com",
    projectId: "chat-app-f97d5",
    storageBucket: "chat-app-f97d5.appspot.com",
    messagingSenderId: "658383822501",
    appId: "1:658383822501:web:934a4ae9848cd1317d774c"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();