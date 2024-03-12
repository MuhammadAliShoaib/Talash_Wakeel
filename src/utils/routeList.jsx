import Login from "../screens/Login.jsx";
import Signup from "../screens/Signup.jsx";
import Dashboard from "../screens/Dashboard.jsx";

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
