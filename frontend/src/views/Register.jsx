import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useEffect } from "react";
import budgetApi from "../api/bpapi";

import { useContext } from "react";



export const Register = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUserData, setIsRegisted } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getCSRFToken = async () => {
      try {
        const response = await budgetApi.get('csrf');
        const csrfToken = response.data.csrf;
        budgetApi.defaults.headers.common['X-CSRFToken'] = csrfToken;
        console.log('Token CSRF obtenido:', csrfToken);
      } catch (error) {
        console.error('Error al obtener el token CSRF:', error);
      }
    };

    getCSRFToken();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const csrfToken = budgetApi.defaults.headers.common['X-CSRFToken'];
      const res = await budgetApi.post("/register", {
        username: data.username,
        password1: data.password,
        password2: data.confirm_password,
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      console.log(res);

      if (res.status === 200) {
        setUserData(res.data);
        setIsRegisted(true);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          autoComplete="off"
          {...register("username", { required: true, maxLength: 20 })}
        />
        {errors.username && <span>Este campo es requerido</span>}

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
          {...register("password1", { required: true, minLength: 8 })}
        />
        {errors.password && (
          <span>
            Este campo es requerido y debe tener al menos 8 caracteres
          </span>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("password2", { required: true, minLength: 8 })}
        />
        {errors.confirm_password && (
          <span>Las contraseñas deben coincidir</span>
        )}

        <input type="submit" />
      </form>
    </>
  );
};
