import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<nav className="p-6 bg-gray-300">
			<ul className="text-2xl font-medium flex flex-row gap-8 justify-center uppercase text-blue-900">
				<li>
					<Link to="/app/transactions">Transactions</Link>
				</li>
				<li>
					<Link to="/app/">Dashboard</Link>
				</li>
				<li>
					<Link to="/app/account">Account</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
