import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Routes, Route } from "react-router-dom";
import Error404 from "./views/404";

import { createContext, useState } from "react";
import Application from "./Application";

export const UserContext = createContext(null);

export function App() {
	const [userData, setUserData] = useState(null);

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			<Routes>
				<Route index element={<Login />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="app/*" element={<Application userData={userData} />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</UserContext.Provider>
	);
}
