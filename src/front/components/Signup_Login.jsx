import React, { useState } from "react";
import { Private } from "../pages/Private";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { jwtDecode } from "jwt-decode";

export const Signup_Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [statusMessage, setStatusMessage] = useState("")
	const [token, setToken] = useState(null)
	const [user, setUser] = useState({ "email": "" })
	const backendUrl = import.meta.env.VITE_BACKEND_URL
	const { store, dispatch } = useGlobalReducer()

	function isTokenValid(myToken) {
		if (!myToken) return false;
		try {
			const { exp } = jwtDecode(myToken);
			console.log("Expiration:", exp)
			console.log("This is the date: ", Date.now())
			if (Date.now() >= exp * 1000) return false; // expired
			return true;
		} catch (e) {
			return false; // invalid token format
		}
	}

	const sign_up = () => {
		let options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		}
		fetch(backendUrl + "/sign_up", options)
			.then((resp) => resp.json())
			.then((data) => setStatusMessage(data.message))

	}
	const log_in = () => {
		let options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		}
		fetch(backendUrl + "/log_in", options)
			.then((resp) => resp.json())
			.then((data) => {
				setStatusMessage(data.message)
				setUser(data.user)
				setToken(data.token)
				isTokenValid(token)
			})

	}

	return (
		<div className="row justify-content-center">
			<div className="col-4 bg-light m-5 border rounded">
				<h1>SIGN UP / LOG IN</h1>
				<div className="row justify-content-center m-5">
					<div className="col-6">
						<input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}></input>
					</div>
					<div className="col-6">
						<input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}></input>
					</div>
				</div>
				<div className="row justify-content-center m-5">
					<button className="btn-success" onClick={sign_up}>Sign Up</button>
				</div>
				<div className="row justify-content-center m-5">
					<button className="btn-success" onClick={log_in}>Log In</button>
				</div>
				{statusMessage + user.email}
			</div>
			{
				isTokenValid(token) ? <Private/> : ""
			}
			
		</div>
	);
}