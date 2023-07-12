import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import budgetApi from "../api/bpapi";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

import { useContext } from "react";

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { setUserData } = useContext(UserContext);

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const res = await budgetApi.post("/login", {
				username: data.username,
				password: data.password1,
			});

			if (res.status === 200) {
				setUserData(res.data);
				navigate("/app");
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						<div className="card-body  px-12">
							<div className="text-center">
								<img src={Logo} alt="Budget Planner Logo" className="p-4" />
								<h1 className="text-4xl font-bold mb-5">Login</h1>
							</div>
							<form onSubmit={handleSubmit(onSubmit)}>
								<input
									type="text"
									placeholder="Name"
									className="input input-bordered input-primary w-full max-w-xs mb-3"
									autoComplete="off"
									{...register("username", { required: true, maxLength: 80 })}
								/>
								{errors.user_name && <span>Este campo es requerido</span>}

								<input
									type="password"
									placeholder="Password"
									className="input input-bordered input-primary w-full max-w-xs"
									{...register("password1", { required: true, minLength: 3 })}
								/>
								{errors.password && (
									<span>
										Este campo es requerido y debe tener al menos 8 caracteres
									</span>
								)}
								<div className="form-control mt-3">
									<input
										type="submit"
										className="btn btn-primary"
										value="Login"
									/>
								</div>
								<p className="pt-5 text-center">
									Not registered yet?{" "}
									<Link className="text-blue-500 underline" to="/register">
										Register now
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
