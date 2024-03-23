import { cities } from "../../utils/data";
import {Box, Grid, Button, TextField, MenuItem, Link} from '@mui/material'


export default function ClientSignup({clientFormik}) {
  return (
    <Box
            component="form"
            noValidate
            onSubmit={clientFormik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="clientFirstName"
                  required
                  fullWidth
                  id="clientFirstName"
                  label="First Name"
                  autoFocus
                  onChange={clientFormik.handleChange}
                  value={clientFormik.values.clientFirstName}
                />
                {clientFormik.errors.clientFirstName ? <Box component={'span'} sx={{display: 'inline', color: 'red'}} >{clientFormik.errors.clientFirstName}</Box> : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="clientLastName"
                  label="Last Name"
                  name="clientLastName"
                  onChange={clientFormik.handleChange}
                  value={clientFormik.values.clientLastName}
                />
                {clientFormik.errors.clientLastName ? <Box component={'span'} sx={{display: 'inline', color: 'red'}} >{clientFormik.errors.clientLastName}</Box> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="clientEmail"
                  label="Email Address"
                  name="clientEmail"
                  onChange={clientFormik.handleChange}
                  value={clientFormik.values.clientEmail}
                />
                {clientFormik.errors.clientEmail ? <Box component={'span'} sx={{display: 'inline', color: 'red'}} >{clientFormik.errors.clientEmail}</Box> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="clientPhoneNumber"
                  label="Contact Number"
                  name="clientPhoneNumber"
                  onChange={clientFormik.handleChange}
                  value={clientFormik.values.clientPhoneNumber}
                />
              {clientFormik.errors.clientPhoneNumber ? <Box component={'span'} sx={{display: 'inline', color: 'red'}} >{clientFormik.errors.clientPhoneNumber}</Box> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  select
                  id="clientCity"
                  name="clientCity"
                  label="Select City"
                  defaultValue={""}
                  variant="outlined"
                  onChange={clientFormik.handleChange}
                  value={clientFormik.values.clientCity}
                >
                  {cities.map((city) => (
                    <MenuItem value={city.name} key={city.id}>
                      <option label={city.name} />
                    </MenuItem>
                  ))}
                </TextField>
                {clientFormik.errors.clientCity ? <Box component={'span'} sx={{display: 'inline', color: 'red'}} >{clientFormik.errors.clientCity}</Box> : null}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="clientPassword"
                  name="clientPassword"
                  label="Password"
                  type="password"
                  onChange={clientFormik.handleChange}
                  value={clientFormik.values.clientPassword}
                />
                {clientFormik.errors.clientPassword ? <Box component={'span'} sx={{display: 'inline', color: 'red'}} >{clientFormik.errors.clientPassword}</Box> : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
  )
}