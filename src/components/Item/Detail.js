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
import { CATEGORIES, ITEMS } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import ItemDialog from "./ItemDialog";
import PropTypes from "prop-types";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function Detail(props) {
  const {
    updateCount
  } = props;
  const { token } = useSelector((state) => state.auth);
  const [items, setItems] = React.useState([]);
  const [openRevealDialog, setOpenRevealDialog] = React.useState(false);
  const [item, setItem] = React.useState({});
  const [itemIndex, setItemIndex] = React.useState(0);
  const [categories, setCategories] = React.useState([]);

  const dispatch = useDispatch();

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  useEffect(() => {
    getAuth(ITEMS, token, ({ data }) => getItems(data), null, dispatch);
    getAuth(CATEGORIES + "/without-detail", token, ({ data }) => getCategories(data), null, dispatch);
  }, []);

  const getCategories = (data) => {
    setCategories(data);
    console.log(data);

  };

  const getItems = (data) => {
    setItems(data);
    updateCount(data.length);

  };

  const handleClose = () => {
    setOpenRevealDialog(false);

  };
  const edit = (item, index) => {
    console.log(item);
    setOpenRevealDialog(true);
    setItem(item);
    setItemIndex(index);

  };

  const add = () => {
    setOpenRevealDialog(true);
    setItem({ id: "", code: "", name: "", detail: "", price: "", compound: false, categoryId: null, status: "ACTIVE", commissionPrice1: 0, commissionPrice2: 0 });
    setItemIndex(-1);

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
              <TableCell >Codigo</TableCell>
              <TableCell >Detalle</TableCell>
              <TableCell >Categoria</TableCell>
              <TableCell >Precio</TableCell>
              <TableCell >Compuesto</TableCell>
              <TableCell >Precio comision 1</TableCell>
              <TableCell >Precio comision 2</TableCell>
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
                <TableCell >{row.code}</TableCell>
                <TableCell >{row.detail}</TableCell>
                <TableCell >{row.categoryName}</TableCell>
                <TableCell >{row.price.toString()}</TableCell>
                <TableCell >{row.compound ? <CheckBoxIcon name={"compound" + row.id} color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />} </TableCell>
                <TableCell >{row.commissionPrice1}</TableCell>
                <TableCell >{row.commissionPrice2}</TableCell>
                <TableCell >{row.status}</TableCell>

                <TableCell >
                  <IconButton aria-label="delete" size="small" onClick={() => edit(row, index)} >
                    <EditIcon fontSize="inherit" />
                  </IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={add}>
          <AddIcon />
        </Fab>
      </TableContainer>
      <ItemDialog
        handleClose={handleClose}
        isOpenDialog={openRevealDialog}
        item={item}
        updateList={updateList}
        categories={categories}

      />
    </>
  );


}

Detail.propTypes = {
  updateCount: PropTypes.func.isRequired,

};

export default Detail;
