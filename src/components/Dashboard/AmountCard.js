import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from "prop-types";

const AmountCards = (props) => {
  const { data } = props;






  return (
    <Card >
      <CardContent>
        <TableContainer  >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Métodos de pago</TableCell>
                <TableCell  >Total de ventas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <strong>TRANSFERENCIAS</strong>
                </TableCell>
                <TableCell >${data.electronicTransfer}</TableCell>
              </TableRow>

              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <strong>EFECTIVO</strong>
                </TableCell>
                <TableCell>${data.cash}</TableCell>
              </TableRow>
              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <strong>TARJETAS DE CRÉDITO</strong>
                </TableCell>
                <TableCell >${data.creditCard}</TableCell>
              </TableRow>
              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <strong>TOTAL</strong>
                </TableCell>
                <TableCell>  <strong>${data.electronicTransfer + data.cash + data.creditCard}</strong></TableCell>
              </TableRow>


            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

    </Card>
  );
};

AmountCards.propTypes = {
  data: PropTypes.object.isRequired
};

export default AmountCards;
