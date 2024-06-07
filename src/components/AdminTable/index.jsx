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
import StarIcon from "@mui/icons-material/Star";

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

export default function AdminTable({ data, handleModal, client }) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {client ? (
                <>
                  <StyledTableCell>Client Id</StyledTableCell>
                  <StyledTableCell>Client Name</StyledTableCell>
                </>
              ) : (
                <>
                  <StyledTableCell>Firm Id</StyledTableCell>
                  <StyledTableCell>Firm Name</StyledTableCell>
                </>
              )}
              <StyledTableCell>Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  {client ? row.clientID : row.firmCouncilId}
                </StyledTableCell>
                <StyledTableCell>
                  {client
                    ? row.clientFirstName + " " + row.clientLastName
                    : row.firmName}
                </StyledTableCell>
                <StyledTableCell>
                  {client ? (
                    <Button
                      variant="contained"
                      onClick={() => handleModal(row)}
                    >
                      Remove Client
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleModal(row)}
                    >
                      Remove Firm
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
