import { FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import { AiFillSetting, AiFillCar } from "react-icons/ai";
import "../App.css";
import ClientHome from "../screens/ClientHome";
import Lawyers from "../screens/Lawyers";
import GavelIcon from '@mui/icons-material/Gavel';
import ViewLawyer from "../screens/ViewLawyer";
import PaymentHistory from "../screens/PaymentHistory";
import Documents from "../screens/Documents.js";
import Settings from "../screens/Settings.js";
import LawyerProfile from "../screens/LawyerProfile.js";
export const sideBarData = [
  {
    name: "Client",
    linkTo: "/",
    icon: <FaUsers size={25} color="white" />,
    element: <ClientHome />,
    both: true,
    list_in_sidebar: true,
    user_type:"client"
  },
 
  {
    name: "View Lawyer",
    linkTo: "/ViewLawyer/:id",
    icon: <FaUsers size={25} color="white" />,
    element: <ViewLawyer />,
    both: true,
    list_in_sidebar: false,
    user_type:"client"
  },
  {
    name: "Lawyers",
    linkTo: "/",
    icon: <GavelIcon size={25} color="white" />,
    element: <Lawyers />,
    both: true,
    list_in_sidebar: true,
    user_type:"firm"
  },
  {
    name: "Lawyer Profile",
    linkTo: "/",
    icon: <GavelIcon size={25} color="white" />,
    element: <LawyerProfile />,
    both: true,
    list_in_sidebar: false,
    user_type:"lawyer"
  },
  {
    name: "Payment History",
    linkTo: "/paymentHistory",
    icon: <MdPayment size={25} color="white" />,
    element: <PaymentHistory />,
    both: true,
    list_in_sidebar: true,
    user_type:"all"
  },
  {
    name: "Documents",
    linkTo: "/documents",
    icon: <FaFile size={25} color="white" />,
    element: <Documents />,
    both: true,
    list_in_sidebar: true,
    user_type:"all"
  },
  {
    name: "Settings",
    linkTo: "/settings",
    icon: <IoSettingsSharp size={25} color="white" />,
    element: <Settings />,
    both: true,
    list_in_sidebar: true,
    user_type:"all"
  },

];
