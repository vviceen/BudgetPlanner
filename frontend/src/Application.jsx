import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/BoardContent/Dashboard";
import Account from "./views/BoardContent/Account";
import NavBar from "./NavBar";
import Error404 from "./views/404";

import useAuth from "./hooks/useAuth";
import propTypes from "prop-types";

const Application = ({ userData }) => {
	useAuth(userData);

	if (!userData) {
		return <h1 className="min-h-screen text-center">Loading user info</h1>;
	}

	return (
		<>
			<NavBar />
			<Routes>
				<Route index element={<Dashboard />} />
				<Route path="account" element={<Account />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</>
	);
};

Application.propTypes = {
	userData: propTypes.object,
};

export default Application;
