import { useState } from "react";
import Summary from "./BoardContent/Summary";
import Transactions from "./BoardContent/Transactions";
import Budget from "./BoardContent/Budget";
import Statistics from "./BoardContent/Statistics";
import FinancialGoals from "./BoardContent/FinancialGoals";
import Account from "./BoardContent/Account";
import { Link } from "react-router-dom";

export function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("Summary");

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const componentMapping = {
    Summary: Summary,
    Transactions: Transactions,
    Budget: Budget,
    Statistics: Statistics,
    "Financial Goals": FinancialGoals,
    Account: Account,
  };

  const CurrentComponent = componentMapping[activeCategory];

  return (
    <>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <CurrentComponent />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-40 h-full bg-base-200 text-base-content">
            {Object.keys(componentMapping).map((category) => (
              <li key={category}>
                <button onClick={() => handleCategoryChange(category)}>
                  {category}
                </button>
              </li>
            ))}
            <li>
              <Link to="/login">Log out</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
