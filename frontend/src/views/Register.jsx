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

  // useEffect(() => {
  //   const getCSRFToken = async () => {
  //     try {
  //       const response = await budgetApi.get('csrf');
  //       const csrfToken = response.data.csrf;
  //       budgetApi.defaults.headers.common['X-CSRFToken'] = csrfToken;
  //       console.log('Token CSRF obtenido:', csrfToken);
  //     } catch (error) {
  //       console.error('Error al obtener el token CSRF:', error);
  //     }
  //   };

  //   getCSRFToken();
  // }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const csrfToken = budgetApi.defaults.headers.common['X-CSRFToken'];
      const res = await budgetApi.post("/register", {
        username: data.username,
        password1: data.password1,
        password2: data.password2,
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      console.log(res);

      if (res.status === 201) {
        setUserData(res.data);
        //setIsRegisted(true);
        console.log(res.data);
        navigate(`/dashboard?user_id=${res.data.user_id}`);
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
            <div className="card-body">
              <div className="text-center">
                <h1 className="text-5xl font-bold">Register</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered input-primary w-full max-w-xs"
                  autoComplete="off"
                  {...register("username", { required: true, maxLength: 20 })}
                />
                {errors.username && <span>Este campo es obligatorio</span>}

                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered input-primary w-full max-w-xs"
                  autoComplete="off"
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && (
                  <span>
                    Este campo es obligatorio y debe ser una dirección de correo
                    electrónico válida
                  </span>)}

                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered input-primary w-full max-w-xs"
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
                  className="input input-bordered input-primary w-full max-w-xs"
                  {...register("password2", { required: true, minLength: 8 })}
                />
                {errors.password2 && (
                  <span>Las contraseñas deben coincidir</span>
                )}

                <div className="form-control mt-6">
                  <input type="submit" className="btn btn-primary" value="Signup"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
