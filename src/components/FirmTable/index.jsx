import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MenuItem, TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#141925",
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function FirmTable({ data }) {
  const [status, setStatus] = useState("Done");

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Client ID</StyledTableCell>
              <StyledTableCell>Lawyer ID</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.clientID}</StyledTableCell>
                <StyledTableCell>{row.lawyerCouncilId}</StyledTableCell>
                <StyledTableCell>
                  {" "}
                  {new Date(row.bookingDate).toLocaleDateString("en-GB")}
                </StyledTableCell>
                <StyledTableCell>
                  {row.status}
                  {/* <TextField
                    required
                    select
                    name="mode"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                    variant="outlined"
                    sx={{ backgroundColor: "white" }}
                  >
                    {["Done", "Cancel"].map((status, index) => (
                      <MenuItem value={status} key={index}>
                        <option label={status} />
                      </MenuItem>
                    ))}
                  </TextField> */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
