import Login from "../screens/Login.js";
import Signup from "../screens/Signup.js";
import Dashboard from "../screens/Dashboard.js";

export const mainRoutes = [
  {
    caption: "Login",
    linkTo: "login",
    icon: "",
    element: <Login />,
    authRequired: false,
    main_dashboard: false,
  },
  {
    caption: "Signup",
    linkTo: "Signup",
    icon: "",
    element: <Signup />,
    authRequired: false,
    main_dashboard: false,
  },
  {
    caption: "Dashboard",
    linkTo: "/*",
    icon: "",
    element: <Dashboard />,
    authRequired: true,
    main_dashboard: true,
  },
];
