import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import StylistSelectChip from "./StylistSelectChip";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4c4c4c',
    color: theme.palette.common.white,
    padding: 2,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    padding: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function OrderDetail() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, '$44'),
    createData("Ice cream sandwich", 237, 9.0, 37, '$110'),
    createData("Eclair", 262, 16.0, 24, '$20'),
    createData("Cupcake", 305, 3.7, 67, '$40'),
    createData("Gingerbread", 356, 16.0, 49, '$400'),
  ];

  return (
    <TableContainer sx={{ marginTop: 4 }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="center">Servicio</StyledTableCell>
            <StyledTableCell align="right">Precio</StyledTableCell>
            <StyledTableCell align="center">Estilista</StyledTableCell>
            <StyledTableCell align="center">Acción</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="right" component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right"><StylistSelectChip/></StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderDetail;
