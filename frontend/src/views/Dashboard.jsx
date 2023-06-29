import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import budgetApi from "../api/bpapi";

export function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await budgetApi.post("/user/expenses/new", {
        user_id: userId,
        amount: data.amount,
        category_name: data.category_name,
        description: data.description,
      });

      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <h1>Dashboard</h1>
          <p>Welcome {userId}</p>

          <h2>Expenses:</h2>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                Expense id:  {expense.expense_id} - Amount: {expense.amount} - Category: {expense.category_of_expense} (por ahora solo el id) - Description: {expense.description}
              </li>
            ))}
          </ul>
          <h2 className="text-xl">Add Expense:</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="number"
              placeholder="Amount"
              className="input input-bordered input-primary w-full max-w-xs"
              min={0}
              autoComplete="off"
              {...register("amount", { required: true })}
            />
            {errors.amount && <span>Error con el monto</span>}

            <select
              defaultValue="Deselected"
              className="select select-primary w-full max-w-xs"
              {...register("category_name", { required: true })}
            >
              <option value="Deselected" disabled>
                Choose category
              </option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Clothing">Clothing</option>
              <option value="Bills">Bills</option>
              <option value="Insurance">Insurance</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Description"
              autoComplete="off"
              {...register("description", { required: true, maxLength: 80 })}
            />
            {errors.amount && <span>Error con el monto</span>}

            <input type="submit"
              className="btn btn-primary"
            />
          </form>


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
            <li>
              <a>Overview</a>
            </li>
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Statistics</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
