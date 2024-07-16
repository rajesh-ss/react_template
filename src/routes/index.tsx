import {App} from "@/app/App";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const routesV1 = createBrowserRouter([
  {
    path: "/v1",
    element: <App />,
    children: [
      { path: "*", element: <Navigate to="404" /> },
    ],
  },
  // { path: "*", element: <Navigate to="/v1/auth/login" /> },
]);
