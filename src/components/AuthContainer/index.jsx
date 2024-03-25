import { Grid } from "@mui/material"
import img from "../../assets/tkLogoWhite.png"

function AuthContainer({ children, image }) {
  return (
    <Grid container sx={{ height: "100vh", alignItems: "center", width: '100vw', justifyContent: 'center' }}>
      <Grid
       sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <img src={image} width={"100%"} height={"100%"}/>
      </Grid>
      <Grid
      >
        {children}
      </Grid>
    </Grid>
  )
}

AuthContainer.defaultProps = {
  image: img,
}

export default AuthContainer