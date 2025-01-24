import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Settings from "../pages/settings/settings";
import NewTask from "../pages/task/create-task";
import TaskList from "../pages/task/task-list";
import AuthLayout from "./authlayout";
import Root from "./root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <div>home</div>,
      },
      {
        path: "task-list",
        element: <TaskList />,
      },
      {
        path: "create-task",
        element: <NewTask />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
