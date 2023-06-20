import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/bpapi";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    console.log(JSON.stringify(data));
    if (
      data.user_name &&
      data.email &&
      data.password &&
      data.confirm_password &&
      data.password === data.confirm_password
    ) {
      await createUser(data);
      navigate("/login");
    }
  });

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          autoComplete="off"
          {...register("user_name", { required: true, maxLength: 20 })}
        />
        {errors.user_name && <span>Este campo es requerido</span>}

        <input
          type="text"
          placeholder="Email"
          autoComplete="off"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && (
          <span>
            Este campo es requerido y debe ser una dirección de correo
            electrónico válida
          </span>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && (
          <span>
            Este campo es requerido y debe tener al menos 8 caracteres
          </span>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirm_password", { required: true, minLength: 8 })}
        />
        {errors.confirm_password && (
          <span>Las contraseñas deben coincidir</span>
        )}

        <input type="submit" />
      </form>
    </>
  );
};
