import { ErrorMessage, Form, useFormikContext } from "formik";
import { cities } from "../../utility/data";
import { Box, Grid, Button, TextField, MenuItem, Link } from "@mui/material";

export default function FirmSignup({ firmFormik }) {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={firmFormik.handleSubmit}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firmName"
            required
            fullWidth
            id="firmName"
            label="Firm Name"
            onChange={firmFormik.handleChange}
            value={firmFormik.values.firmName}
            autoFocus
          />
          {firmFormik.errors.firmName ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {firmFormik.errors.firmName}
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firmCouncilId"
            required
            fullWidth
            id="firmCouncilId"
            label="Bar Council ID"
            onChange={firmFormik.handleChange}
            value={firmFormik.values.firmCouncilId}
            autoFocus
          />
          {firmFormik.errors.firmCouncilId ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {firmFormik.errors.firmCouncilId}
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="firmEmail"
            label="Email Address"
            name="firmEmail"
            onChange={firmFormik.handleChange}
            value={firmFormik.values.firmEmail}
          />
          {firmFormik.errors.firmEmail ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {firmFormik.errors.firmEmail}
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="firmPhoneNumber"
            label="Contact Number"
            name="firmPhoneNumber"
            onChange={firmFormik.handleChange}
            value={firmFormik.values.firmPhoneNumber}
          />
          {firmFormik.errors.firmPhoneNumber ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {firmFormik.errors.firmPhoneNumber}
            </Box>
          ) : null}
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            select
            name="firmCity"
            onChange={firmFormik.handleChange}
            label="Select City"
            value={firmFormik.values.firmCity}
            variant="outlined"
          >
            {cities.map((city) => (
              <MenuItem value={city.name} key={city.id}>
                <option label={city.name} />
              </MenuItem>
            ))}
          </TextField>
          {firmFormik.errors.firmCity ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {firmFormik.errors.firmCity}
            </Box>
          ) : null}
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="firmPassword"
            label="Password"
            type="password"
            id="firmPassword"
            onChange={firmFormik.handleChange}
            value={firmFormik.values.firmPassword}
          />
          {firmFormik.errors.firmPassword ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {firmFormik.errors.firmPassword}
            </Box>
          ) : null}
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
  );
}
