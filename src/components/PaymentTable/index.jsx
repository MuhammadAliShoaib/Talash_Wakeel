import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";

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

export default function PaymentTable({ payments, makePayment }) {
  const { auth } = useAuth();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Appointment ID</StyledTableCell>
              {auth?.role === "client" ? (
                <StyledTableCell>Lawyer ID</StyledTableCell>
              ) : (
                <StyledTableCell>Client ID</StyledTableCell>
              )}
              <StyledTableCell>Pending Amount</StyledTableCell>
              <StyledTableCell>Paid Amount</StyledTableCell>
              <StyledTableCell>Payment Status</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments?.map((payment, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{payment.appointmentId}</StyledTableCell>
                {auth?.role === "client" ? (
                  <StyledTableCell>{payment.lawyerCouncilId}</StyledTableCell>
                ) : (
                  <StyledTableCell>{payment.clientID}</StyledTableCell>
                )}
                <StyledTableCell>{payment.pendingAmount}</StyledTableCell>
                <StyledTableCell>{payment.amountPaid}</StyledTableCell>
                <StyledTableCell>{payment.paymentStatus}</StyledTableCell>
                {auth?.role !== "lawyer" &&
                payment.paymentStatus === "Pending" ? (
                  <StyledTableCell>
                    <Button
                      onClick={() =>
                        makePayment(
                          payment.appointmentId,
                          payment.pendingAmount
                        )
                      }
                      href=""
                      size="medium"
                      variant="contained"
                    >
                      Payment
                    </Button>
                  </StyledTableCell>
                ) : (
                  <StyledTableCell></StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
