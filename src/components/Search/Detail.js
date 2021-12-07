import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import MoreVertIcon from '@mui/icons-material/MoreVert';
function createData(name, date, fat, carbs, protein) {
  return { name, date, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt rozen yoghurt", "24/05/2017", 6.0, 24, 4.0),
  createData("Ice cream sandwich eam sandwich", "24/05/2017", 9.0, 37, 4.3),
  createData("Eclair eam sandwich", "24/05/2017", 16.0, 24, 6.0),
  createData("Cupcake eam sandwich", "24/05/2017", 3.7, 67, 4.3),
  createData("Gingerbread eam sandwich", "24/05/2017", 16.0, 49, 3.9),
];

const Detail = (props) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table dense sx={{}} aria-label="simple table" size="small">
          <TableHead sx={{backgroundColor: '#dbdbdb'}}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell >Fecha</TableCell>
              <TableCell >Client</TableCell>
              <TableCell >Estilista</TableCell>
              <TableCell >Estado</TableCell>
              <TableCell >Servicios</TableCell>
              <TableCell >Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell >{row.date}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell >{row.fat}</TableCell>
                <TableCell >{row.carbs}</TableCell>
                <TableCell >{row.protein}</TableCell>
                <TableCell >
                  <IconButton aria-label="delete" size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small">
                    <MoreVertIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

Detail.propTypes = {};

export default Detail;
