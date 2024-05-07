import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

export default function AppointmentTable({ data }) {

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Client ID</StyledTableCell>
                            <StyledTableCell>Client Name</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((client, index) =>
                            <StyledTableRow key={index}>
                                <StyledTableCell >
                                    {client.clientID}
                                </StyledTableCell>
                                <StyledTableCell>{client.clientFirstName} {client.clientLastName}</StyledTableCell>
                                <StyledTableCell>{client.date}</StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
