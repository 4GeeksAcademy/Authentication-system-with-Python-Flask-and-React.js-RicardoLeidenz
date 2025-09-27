import React, { useEffect } from "react"
import { Signup_Login } from "../components/Signup_Login.jsx";

export const Home = () => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL

	const get_user = () => {
		let options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token")
			}
		}
		fetch(backendUrl + "/user", options)
			.then((resp) => resp.json())
			.then((data) => {
				console.log("Data =", data)
			})
	}

	useEffect(() => {
		get_user()
	}, [])

	return (
		<div className="text-center mt-5">
			{
				localStorage.getItem("token")
					? "Welcome Back " + localStorage.getItem("user")
					: <Signup_Login />
			}
		</div>
	);
}; 