import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { Login } from "../views/Login";
import { Dashboard } from "../views/Dashboard";

export const Router = () => {
    const router = createBrowserRouter([
        {
          path: "/login",
          element: <Login />,
        },
        {
            path: "/",
            element: <Dashboard />,
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
        },
        {
            path: "/*",
            element: <div>Error 404</div>
        }
      ]);
    return (
        <RouterProvider router={router} />
    )
}
