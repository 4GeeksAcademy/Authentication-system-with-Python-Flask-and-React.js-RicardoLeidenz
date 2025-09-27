import { Link } from "react-router-dom";

export const Navbar = () => {
	function logout() {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">HOME</span>
				</Link>
				<div className="ml-auto">
					{
						localStorage.getItem("token") != null
							? <div>
								<Link to={"/private"}>
									<button className="btn btn-primary mx-2">GO TO PROFIILE</button></Link>
								<Link to={"/"}>
									<button className="btn btn-secondary" onClick={logout}>LOG OUT</button>
								</Link>
							</div>
							: ""
					}
				</div>
			</div>
		</nav>
	);
};