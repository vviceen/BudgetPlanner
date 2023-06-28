import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import budgetApi from "../api/bpapi";

export function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const userId = searchParams.get("user_id");

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        const response = await budgetApi.post("/user/expenses", {
          user_id: userId,
        });
        console.log(response);
        setExpenses(response.data.expenses);
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
      }
    };

    if (userId) {
      getAllExpenses();
    }
  }, [userId]);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome {userId}</p>

      <h2>Expenses:</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            Amount: {expense.amount}, Currency: {expense.currency}
          </li>
        ))}
      </ul>
    </>
  );
}