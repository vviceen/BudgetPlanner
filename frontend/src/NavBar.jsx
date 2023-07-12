import { useContext } from "react";
import { UserContext } from "./App";
import { Link } from "react-router-dom";

const NavBar = () => {
	const { setUserData } = useContext(UserContext);

	const logout = () => {
		setUserData(null);
	};

	return (
		<nav className="p-4" style={{ backgroundColor: "#0388c6" }}>
			<ul className="text-2xl flex flex-row gap-8 justify-center text-white">
				<li>
					<Link to="/app/account">Account</Link>
				</li>
				|
				<li>
					<Link to="/app/">Dashboard</Link>
				</li>
				|
				<li>
					<button onClick={() => logout()}>Log out</button>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
