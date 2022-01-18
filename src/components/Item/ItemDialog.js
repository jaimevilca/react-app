import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux";
import DialogTitle from '@mui/material/DialogTitle';
import { ITEMS } from "../../utils/constants";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import { postAuth, putAuth } from "../../utils/axiosHandler";

function ItemDialog(props) {
  const {
    isOpenDialog,
    handleClose,
    item,
    updateList,
    categories

  } = props;

  const [entity, setEntity] = React.useState({});
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const onSuccessSaveData = (data) => {

    updateList(data.data);
    handleClose();
  };

  useEffect(() => {
    if (item)
      setEntity(item);

  }, [item]);


  const handleChange = (e) => {
    console.log(e.target);
    setEntity({
      ...entity,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };
  const save = () => {
    const data = {
      ...entity
    };
    if (!Array.isArray(data.price))
      data.price = Array.from(data.price.split(','), Number);
    if (!data.id) {

      postAuth(ITEMS, data, token, onSuccessSaveData, null, dispatch);

    } else {
      putAuth(ITEMS + '/' + entity.id, data, token, onSuccessSaveData, null, dispatch);
    }

  };

  return (
    <div>

      <Dialog open={isOpenDialog} onClose={handleClose}>
        <DialogTitle>Item</DialogTitle>
        <DialogContent>
          {JSON.stringify(entity)}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Codigo"
                type="text"
                name="code"
                value={entity.code}
                onChange={handleChange}
                variant="standard"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel htmlFor="grouped-native-select">Categoría</InputLabel>

                <Select name="categoryId" native onChange={handleChange} value={entity.categoryId} id="grouped-native-select" label="Grouping">
                  {categories && categories.length > 0 && categories.map(row => {
                    return <>
                      < optgroup label={row.name} >
                        {row.childs.map(child => {
                          return <>
                            <option value={child.id}>{child.name}</option>
                          </>

                        })}

                      </optgroup>
                    </>

                  })}
                </Select>

              </FormControl>
            </Grid>
            <Grid item xs={12}>

              <TextField
                autoFocus
                margin="dense"
                label="Detalle del producto"
                type="text"
                value={entity.detail}
                name="detail"
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>

              <TextField
                autoFocus
                margin="dense"
                label="Lista de precios"
                type="text"
                value={entity.price}
                name="price"
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Precio de comisión 1"
                type="text"
                value={entity.commissionPrice1}
                name="commissionPrice1"
                onChange={handleChange}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Precio de comisión 2"
                type="text"
                value={entity.commissionPrice2}
                name="commissionPrice2"
                onChange={handleChange}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel control={
                <Checkbox
                  checked={entity.compound}
                  name={"compound"}
                  onChange={handleChange}
                />} label="Compuesto"
              />

            </Grid>

            <Grid item xs={6}>
              <FormControl variant="filled" sx={{ m: 2, minWidth: 200 }}>
                <InputLabel id="label-status">Estado</InputLabel>

                <Select
                  labelId="label-status"
                  id="demo-simple-select"
                  value={entity.status}
                  name="status"
                  onChange={handleChange}
                >
                  <MenuItem value={"ACTIVE"}>Activo</MenuItem>
                  <MenuItem value={"INACTIVE"}>Inactivo</MenuItem>

                </Select>
              </FormControl>

            </Grid>

          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={save}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}

ItemDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,

  item: PropTypes.object,
  updateList: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,


};


export default ItemDialog;
