import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import budgetApi from "../../api/bpapi";

const Account = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userData } = useContext(UserContext);
  const [actualBudget, setActualBudget] = useState(0);

  useEffect(() => {
    const fetchActualBudget = async () => {
      try {
        const response = await budgetApi.get("api/budget", {
          user: userData,
        });
        const budget = response.data.slice(-1)[0].budget;
        console.log(budget);
        setActualBudget(budget);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActualBudget();
  }, [userData]);

  const onSubmit = async (data) => {
    console.log({user: userData.user_id, budget: data.budget,});
		try {
        const res = await budgetApi.post("api/budget/", {
				user: userData.user_id,
				budget: data.budget
			});

			if (res.status === 201) {
				console.log("Budget updated successfully");
			}
		} catch (err) {
			console.error(err);
		}
	};

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
						<form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text lg:text-lg">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="@Username"
                  autoComplete="off"
                  className="input input-bordered input-primary w-full max-w-xs"
                  {...register("username", { required: false, maxLength: 30 })}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text lg:text-lg">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="e. g. example@mail.com"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label ">
                  <span className="label-text lg:text-lg">Enter your budget</span>
                </label>
                <input
                  type="number"
                  placeholder="Budget"
                  min="0"
                  value={actualBudget}
                  defaultValue={actualBudget}
                  className="input input-bordered input-primary w-full max-w-xs"
                  onInput={(e) => setActualBudget(e.target.value)}
                  {...register("budget", { required: false, min: 0 })}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text lg:text-lg">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="********"
                  className="input input-bordered input-primary w-full max-w-xs"
                  disabled
                />
              </div>
              <div className="card-actions justify-end mt-3">
                <input
                      type="submit"
                      className="btn btn-xs sm:btn-sm md:btn-md btn-neutral"
                      value="Confirm Changes"
                    />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
