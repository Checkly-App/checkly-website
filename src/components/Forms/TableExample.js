import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/styles';

const TableHeaders = styled(TableHead)({
  background: '#56BBEB',
  color: 'white',
});

function createData(employee_id, name, email, national_id, phone_number, birthdate, address, gender, department, position) {
  return { employee_id, name, email, national_id, phone_number, birthdate, address, gender, department, position };
}

const rows = [
  createData('335','Aleen AlSuhaibani','aleenalsuhaibani@gmail.com','1122112211','0537337588','01/03/1995','AlManar District','female','IT','Backend Engineer'),
];

export default function DenseTable() {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
        <TableHeaders>
          <TableRow >
            <TableCell align="left">employee_id</TableCell>
            <TableCell align="left">name</TableCell>
            <TableCell align="left">email</TableCell>
            <TableCell align="left">national_id</TableCell>
            <TableCell align="left">phone_number</TableCell>
            <TableCell align="left">birthdate</TableCell>
            <TableCell align="left">address</TableCell>
            <TableCell align="left">gender</TableCell>
            <TableCell align="left">department</TableCell>
            <TableCell align="left">position</TableCell>
          </TableRow>
        </TableHeaders>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.employee_id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.national_id}</TableCell>
              <TableCell align="left">{row.phone_number}</TableCell>
              <TableCell align="left">{row.birthdate}</TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="left">{row.gender}</TableCell>
              <TableCell align="left">{row.department}</TableCell>
              <TableCell align="left">{row.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
