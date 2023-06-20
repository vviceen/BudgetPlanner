import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Dashboard } from "./views/Dashboard";
import { Routes, Route } from "react-router-dom";

import { createContext, useState } from "react";

export const UserContext = createContext(null);

export function App() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, isLoggedIn, setIsLoggedIn }}
    >
      <Routes>
        <Route index element={<div>Landing</div>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<div>Error 404</div>} />
      </Routes>
    </UserContext.Provider>
  );
}
