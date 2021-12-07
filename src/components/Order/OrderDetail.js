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
import PropTypes from "prop-types";


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




function OrderDetail(props) {
  const { detail, setDetail, setChecked, names } = props;

  const removeDetail = key => {
    const filterDetail = detail.filter((det) => det.key != key);
    setDetail(filterDetail);

    setChecked(e => e.filter(k => k != key));
  }

  const updateParticipants = (key, participants) => {


 
    const updateParticipantsDetail = detail.map((d) =>
      d.key === key ? { ...d, participants } : d
    );

    setDetail(updateParticipantsDetail);    
  }

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
          {detail.map(({description, price, key}, index) => (
            <StyledTableRow
              key={index.toString()}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="right" component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center">{description}</StyledTableCell>
              <StyledTableCell align="right">${price}</StyledTableCell>
              <StyledTableCell align="right">
                <StylistSelectChip
                  updateParticipants={updateParticipants}
                  id={key}
                  names={names} />
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={()=> removeDetail(key)}
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

OrderDetail.propTypes = {
  setDetail: PropTypes.func.isRequired,
  setChecked: PropTypes.func.isRequired,
  detail: PropTypes.array.isRequired,
  names: PropTypes.array.isRequired,
};

export default OrderDetail;
