import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Signup_Login } from "../components/Signup_Login.jsx";

export const Private = () => {

    useEffect(() => {
    }, [])

    return (
        <div className="text-center mt-5">
            <h1>You shouldn't be here</h1>
        </div>
    );
}; 