import { Routes, Route } from "react-router-dom";
import Summary from "./views/BoardContent/Summary";
import Transactions from "./views/BoardContent/Transactions";
import Account from "./views/BoardContent/Account";
import NavBar from "./NavBar";

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
				<Route index element={<Summary />} />
				<Route path="transactions" element={<Transactions />} />
				<Route path="account" element={<Account />} />
				<Route path="*" element={<h1>Error page</h1>} />
			</Routes>
		</>
	);
};

Application.propTypes = {
	userData: propTypes.object,
};

export default Application;
