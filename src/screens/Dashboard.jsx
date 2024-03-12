import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Templates_SideBar from "../components/drawer/Templates_SideBar";
import Template_Side_Drawer from "../components/drawer/Template_Side_Drawer ";
import { Stack } from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {current_user} = useSelector(state=>state.auth);
  // console.log("auth data",current_user.uid);
//   useEffect(() => {
// let data=    getFirestoreDataByDocNameValue("users",current_user?.uid)
//   dispatch(setCurrentUser(data))
//   }, [])
const [active_sidebar_index, setactive_sidebar_index] = useState(0);

const change_side_menu_handle = (index) => {
  setactive_sidebar_index(index);
};
  return (
    // <div>
    //   <h1>Dashboard</h1>
    //   <h2>I am {current_user?.userType}</h2>
    //   <button
    //     onClick={async () => {
    //       signOutUser();
    //       window.location.reload();
    //     }}
    //   >
    //     logout
    //   </button>
    //   <button
    //     onClick={() => {
    //       createLawyerUser(
    //         {
    //           firstName: "xyz",
    //           lastName: "xyz",
    //           email: "xyz@gmail.com",
    //           password: "xyz@#$sa",
    //         },
    //         dispatch
    //       );
    //     }}
    //   >
    //     create lawyer
    //   </button>
    // </div>
    <>
    <Stack sx={{ position: "relative" }}>
      <Templates_SideBar
        change_side_menu_handle={change_side_menu_handle}
        active_sidebar_index={active_sidebar_index}
      />
    </Stack>

    <Stack sx={{ marginLeft: 0 }}>
      <Template_Side_Drawer
        change_side_menu_handle={change_side_menu_handle}
        active_sidebar_index={active_sidebar_index}
      />
    </Stack>
  </>
  );
};

export default Dashboard;
