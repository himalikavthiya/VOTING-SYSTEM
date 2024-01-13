import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function ConectElection() {
    const rows = [
      { No: 1, name: "Election Party 1", date: "25-01-2024" },
      { No: 2, name: "Election Party 2", date: "26-01-2024" },
      { No: 3, name: "Election Party 3", date: "25-01-2024" },
      // Add more rows as needed
    ];

    return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>E-Election Name</TableCell>
                <TableCell align="right">E-Election Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.No}>
                  <TableCell component="th" scope="row">
                    {row.No}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            className="btn p-color"
            style={{ margin: 20 }}
            size="large"
          >
            Add
          </Button>
        </div>
      </div>
    );
  };



export default ConectElection;
