import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import budgetApi from "../api/bpapi";

import { useContext } from "react";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUserData, setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await budgetApi.post("/users/login", {
        username: data.username,
        password: data.password1,
      });

      if (res.status === 200) {
        setUserData(res.data);
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          {...register("username", { required: true, maxLength: 80 })}
        />
        {errors.user_name && <span>Este campo es requerido</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password1", { required: true, minLength: 8 })}
        />
        {errors.password && (
          <span>
            Este campo es requerido y debe tener al menos 8 caracteres
          </span>
        )}

        <input type="submit" />
      </form>
    </>
  );
};
