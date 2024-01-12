
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const SelectElection = () => {
  const rows = [
    { No: 1, name: 'Election Party 1', logo: 'logo_url_1', shortCode: 'EP1' },
    { No: 2, name: 'Election Party 2', logo: 'logo_url_2', shortCode: 'EP2' },
    // Add more rows as needed
  ];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>E-Election Party Name</TableCell>
              <TableCell align="right">E-Election Party Logo</TableCell>
              <TableCell align="right">E-Election Party Short Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.No}>
                <TableCell component="th" scope="row">
                  {row.No}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.logo}</TableCell>
                <TableCell align="right">{row.shortCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SelectElection;
