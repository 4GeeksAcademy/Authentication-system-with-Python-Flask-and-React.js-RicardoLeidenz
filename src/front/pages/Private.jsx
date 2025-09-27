import React, { useEffect } from "react"

export const Private = () => {

    useEffect(() => {
    }, [])

    return (
        <div className="text-center mt-5">
            <h1>Welcome to your profile {localStorage.getItem("user")}</h1>
        </div>
    );
}; 