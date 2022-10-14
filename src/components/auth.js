import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

import {useState, createContext, useContext, useEffect } from "react";
import { auth as firebaseAuth } from "./firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    function signin(email, password) {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    function logout () {
        setUser(null);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(firebaseAuth, email);
    }

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);



    return(<AuthContext.Provider value={{ user, signup, signin, logout, resetPassword }}> {!loading && children} </AuthContext.Provider>);
}

export const useAuth = () => {
    return useContext(AuthContext);
}