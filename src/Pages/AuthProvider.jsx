import React, { useEffect, useState } from 'react';
import { createContext } from 'react'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import app from './firebas.config';



export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    const googleSingInUser = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const userSingOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        userSingOut,
        googleSingInUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;