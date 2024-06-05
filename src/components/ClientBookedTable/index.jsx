import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

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

export default function ClientBookedTable({
  data,
  requestTable,
  handleClick,
  closedTable,
  handleRatingModal,
}) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Firm Id</StyledTableCell>
              <StyledTableCell>Lawyer Name</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              {requestTable || closedTable ? (
                <StyledTableCell></StyledTableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.firmCouncilId}</StyledTableCell>
                <StyledTableCell>
                  {row.lawyerDetails.firstName +
                    " " +
                    row.lawyerDetails.lastName}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(row.bookingDate).toLocaleDateString("en-GB")}
                </StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                {requestTable ? (
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleClick(row.appointmentId)}
                    >
                      Cancel
                    </Button>
                  </StyledTableCell>
                ) : null}
                {closedTable && !row.isRated && row.status !== "Canceled" ? (
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleRatingModal(row)}
                    >
                      Give Rating
                    </Button>
                  </StyledTableCell>
                ) : (
                  closedTable &&
                  row.status !== "Canceled" && (
                    <StyledTableCell>Rated</StyledTableCell>
                  )
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
