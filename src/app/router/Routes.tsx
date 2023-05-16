import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";

import HomePage from "../../features/home/HomePage";
import NotFound from "../../features/errors/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "home", element: <HomePage /> },
          { path: "test/:id", element: <HomePage /> },
          { path: "errors", element: <HomePage /> },
        ],
      },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <HomePage /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
