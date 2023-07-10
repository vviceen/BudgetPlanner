import { useForm } from "react-hook-form";
import budgetApi from "../../api/bpapi";

import { UserContext } from "../../App";
import { useContext } from "react";

import propTypes from "prop-types";

const Transactions = ({ setShouldUpdate }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { userData } = useContext(UserContext);

	// console.log(userData);

	const onSubmit = async (data) => {
		// console.log(data);

		// console.log(userData.user_id);

		try {
			const res = await budgetApi.post("/api/expenses/", {
				amount: data.amount,
				user: userData.user_id,
				category_of_expense: data.category_name,
				description: data.description,
				currency: "UYU",
			});
			if (res.status === 201) {
				// console.log(res.data);
				setShouldUpdate((prevState) => !prevState);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex justify-center p-8">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center items-start gap-4"
			>
				<input
					type="number"
					placeholder="Amount"
					className="input input-bordered input-primary w-full max-w-xs"
					min={0}
					autoComplete="off"
					{...register("amount", { required: true })}
				/>
				{errors.amount && <span>Invalid amount.</span>}

				<select
					defaultValue=""
					className="select select-primary w-full max-w-xs"
					{...register("category_name", { required: true })}
				>
					<option value="">Choose category</option>
					<option value="1">Food</option>
					<option value="2">Transport</option>
					<option value="3">Entertainment</option>
					<option value="4">Health</option>
					<option value="5">Education</option>
					<option value="6">Clothing</option>
					<option value="7">Bills</option>
					<option value="8">Insurance</option>
					<option value="9">Travel</option>
					<option value="10">Other</option>
				</select>
				{errors.category_name && <span>Please choose a category.</span>}
				<input
					type="text"
					className="input input-bordered input-primary w-full max-w-xs"
					placeholder="Description"
					autoComplete="off"
					{...register("description", { required: true, maxLength: 80 })}
				/>
				{errors.description && <span>Invalid description.</span>}

				<input type="submit" className="btn btn-primary w-full" />
			</form>
		</div>
	);
};

Transactions.propTypes = {
	setShouldUpdate: propTypes.func.isRequired,
};

export default Transactions;
