import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import budgetApi from "../api/bpapi";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

import { useContext } from "react";

export const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { setUserData } = useContext(UserContext);

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const res = await budgetApi.post("/register", {
				username: data.username,
				password1: data.password1,
				password2: data.password2,
			});
			console.log(res);

			if (res.status === 201) {
				setUserData(res.data);
				//setIsRegisted(true);
				console.log(res.data);
				navigate(`/app`);
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
						<div className="card-body px-12">
							<div className="text-center">
								<img src={Logo} alt="Budget Planner Logo" className="p-4" />
								<h1 className="text-4xl font-bold mb-5">Register</h1>
							</div>
							<form onSubmit={handleSubmit(onSubmit)}>
								<input
									type="text"
									placeholder="Name"
									className="input input-bordered input-primary w-full max-w-xs mb-3"
									autoComplete="off"
									{...register("username", { required: true, maxLength: 20 })}
								/>
								{errors.username && <span>Este campo es obligatorio</span>}

								<input
									type="text"
									placeholder="Email"
									className="input input-bordered input-primary w-full max-w-xs mb-3"
									autoComplete="off"
									{...register("email", {
										required: true,
										pattern: /^\S+@\S+$/i,
									})}
								/>
								{errors.email && (
									<span>
										Este campo es obligatorio y debe ser una dirección de correo
										electrónico válida
									</span>
								)}

								<input
									type="password"
									placeholder="Password"
									className="input input-bordered input-primary w-full max-w-xs mb-3"
									{...register("password1", { required: true, minLength: 8 })}
								/>
								{errors.password1 && (
									<span>
										Este campo es obligatorio y debe tener al menos 8 caracteres
									</span>
								)}

								<input
									type="password"
									placeholder="Confirm Password"
									className="input input-bordered input-primary w-full max-w-xs mb-3"
									{...register("password2", { required: true, minLength: 8 })}
								/>
								{errors.password2 && (
									<span>Las contraseñas deben coincidir</span>
								)}

								<div className="form-control">
									<input
										type="submit"
										className="btn btn-primary"
										value="Signup"
									/>
								</div>
							</form>
							<p className="pt-5 text-center">
								Already have an account?{" "}
								<Link className="text-blue-500 underline" to="/login">
									Log In
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
