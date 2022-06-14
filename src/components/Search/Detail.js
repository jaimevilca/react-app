import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { getAuth } from "../../utils/axiosHandler";
import { CATEGORIES, ORDER } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Visibility from '@mui/icons-material/Visibility';
import OrderDetailDialog from "./OrderDetailDialog";
import { useNavigate } from "react-router-dom";

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function Detail(props) {
  const {
    updateCount,
    query
  } = props;
  const { token } = useSelector((state) => state.auth);
  const [items, setItems] = React.useState([]);
  const [openRevealDialog, setOpenRevealDialog] = React.useState(false);
  const [item, setItem] = React.useState({});
  const [itemIndex, setItemIndex] = React.useState(0);

  const dispatch = useDispatch();

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  const openOrder = (order) => {
    setItem(order);
    setOpenRevealDialog(true);
  };

  const handleClose = () => {
    setOpenRevealDialog(false);
  };

  useEffect(() => {
    console.log("Detail: " + query);
    getAuth(ORDER + "/search?search=" + query, token, ({ data }) => getItems(data), null, dispatch);
  }, [query]);



  const getItems = (data) => {
    setItems(data);
    updateCount(data.length);

  };


  const edit = (item, index) => {
    setOpenRevealDialog(true);
    setItem(item);
    setItemIndex(index);

  };

  const add = () => {
    setOpenRevealDialog(true);
    setItem({ id: "", code: "", name: "", detail: "", price: "", compound: false, categoryId: null, status: "ACTIVE", commissionPrice1: 0, commissionPrice2: 0 });
    setItemIndex(-1);

  };
  let navigate = useNavigate();

  const editOrder = (id) => {
    navigate("../order/" + id, { replace: true });
  };
  const updateList = (item) => {

    let newState = [...items];
    if (itemIndex >= 0) {
      newState[itemIndex] = item;
    } else {
      newState.push(item);
    }
    setItems(newState);
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table dense sx={{}} aria-label="simple table" size="small">
          <TableHead sx={{ backgroundColor: '#dbdbdb' }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell >Orden</TableCell>
              <TableCell >Nombre</TableCell>
              <TableCell >Teléfono</TableCell>
              <TableCell >Email</TableCell>
              <TableCell >Fecha de creación</TableCell>
              <TableCell >Fecha de actualización</TableCell>
              <TableCell >Estado</TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell >{row.id}</TableCell>
                <TableCell >{row.clientName}</TableCell>
                <TableCell >{row.clientPhone}</TableCell>
                <TableCell >{row.clientEmail}</TableCell>
                <TableCell >{row.creationDate}</TableCell>
                <TableCell >{row.lastUpdateDate}</TableCell>
                <TableCell >{row.status}</TableCell>
                <TableCell >
                  <IconButton aria-label="delete" size="small" onClick={() => edit(row, index)} >
                    <Visibility fontSize="inherit" />
                  </IconButton>

                  <IconButton aria-label="delete" size="small" onClick={() => editOrder(row.id)} >
                    <EditIcon fontSize="inherit" />
                  </IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <OrderDetailDialog
          order={item}
          open={openRevealDialog}
          handleClose={handleClose}
        />
      </TableContainer>




    </>
  );


}

Detail.propTypes = {
  updateCount: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,

};

export default Detail;
