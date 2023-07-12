import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (userData) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!userData) {
			navigate("/");
		}
	}, [userData, navigate]);
};

export default useAuth;
