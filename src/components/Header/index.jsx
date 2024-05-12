import Box from "@mui/material/Box";
import { Badge, Button, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

export default function Header({ title }) {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleDisconnect = async () => {
    try {
      if (auth.role === "firm") {
        const response = (await axios.get("/api/firmAuth/logout")).data;
        toast.success(`${response.message}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      } else if (auth.role === "client") {
        const response = (await axios.get("/api/clientAuth/logout")).data;
        toast.success(`${response.message}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      } else if (auth.role === "lawyer") {
        const response = (await axios.get("/api/lawyerAuth/logout")).data;
        toast.success(`${response.message}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      } else throw new Error("Something went wrong");
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <Box
      sx={{
        padding: "0px 20px 0px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        background: "black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="">
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 25,
              marginY: "14px",
              color: "white",
            }}
          >
            {title}
          </Typography>
        </div>
      </Box>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Button
          onClick={handleDisconnect}
          href=""
          size="medium"
          variant="contained"
          sx={{ my: 1, mx: 1.5 }}
        >
          Logout
        </Button>
      </div>
    </Box>
  );
}
