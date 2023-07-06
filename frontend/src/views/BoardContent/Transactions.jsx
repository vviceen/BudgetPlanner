import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import budgetApi from "../../api/bpapi";

const Transactions = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [expenses, setExpenses] = useState([]);

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	const userId = searchParams.get("user_id");

	useEffect(() => {
		const getAllExpenses = async () => {
			try {
				const response = await budgetApi.post("/user/expenses", {
					user_id: userId,
				});
				const expensesData = response.data.expenses;

				// Obtener los IDs de categorías únicos
				const categoryIds = [
					...new Set(
						expensesData.map((expense) => expense.category_of_expense)
					),
				];

				// Hacer una solicitud para obtener todas las categorías correspondientes a los IDs
				const categoriesResponse = await budgetApi.post("/category", {
					category_ids: categoryIds,
				});

				const categoriesData = categoriesResponse.data.categories; // Cambiar a categoriesData

				// Asignar el nombre de la categoría a cada gasto
				const expensesWithCategories = expensesData.map((expense) => {
					const category = categoriesData.find(
						(category) => category.category_id === expense.category_of_expense
					);
					const categoryName = category ? category.name : "";
					return { ...expense, categoryName };
				});

				setExpenses(expensesWithCategories);
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

	const [isDeleting, setIsDeleting] = useState(false);

	const removeExpense = async (id) => {
		console.log(id);
		setIsDeleting(true);
		try {
			const res = await budgetApi.post("/user/expenses/delete", {
				expense_id: id,
			});
			if (res.status === 200) {
				console.log(res.data);
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<div className="grid gap-4 grid-cols-2">
				{expenses.map((expense, index) => (
					<div className="card w-96 bg-base-100 shadow-md" key={index}>
						<div className="card-body">
							<div className="card-actions justify-end">
								<button
									className="btn btn-square btn-sm"
									onClick={() => removeExpense(expense.expense_id)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										x="0px"
										y="0px"
										width="32"
										height="32"
										viewBox="0 0 32 32"
									>
										<path d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z"></path>
									</svg>
								</button>
							</div>
							<h5 className="card-title">Amount: {expense.amount}</h5>
							<p className="card-text">Description: {expense.description}</p>
							<p className="card-text">Category: {expense.categoryName}</p>
						</div>
						{isDeleting && <p>Deleting expense...</p>}
					</div>
				))}
			</div>
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

				<input type="submit" className="btn btn-primary" />
			</form>
		</>
	);
};

export default Transactions;
