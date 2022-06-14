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
import { openSnackbar } from "../../actions/ui";

function PaymentMethodDialog(props) {
  const {
    isOpenDialog,
    handleClose,

    getEntity,
    total
  } = props;
  const dispatch = useDispatch();
  const [entity, setEntity] = React.useState({
    electronicTransfer: Number(0),
    cash: Number(0),
    creditCard: Number(0)
  });
  const handleChange = (e) => {
    setEntity({
      ...entity,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };
  const validate = () => {
    const totalValue = Number(entity.electronicTransfer) + Number(entity.cash) + Number(entity.creditCard)
    console.log(total,);
    if (total === totalValue)
      return true;
    else {
      dispatch(
        openSnackbar(
          "error",
          "La suma debe ser igual a $" + total,
          5000
        ));
      return false;
    }

  };
  const save = () => {
    if (validate()) {
      const data = {
        ...entity,
        electronicTransfer: Number(entity.electronicTransfer),
        cash: Number(entity.cash),
        creditCard: Number(entity.creditCard)
      };

      getEntity(data);
      handleClose();
    }

  };

  return (
    <div>

      <Dialog open={isOpenDialog} onClose={handleClose}>
        <DialogTitle>Detalle de pago</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="electronicTransfer"
                value={entity.electronicTransfer}
                onChange={handleChange}
                id="outlined-basic"
                label="Transferencia"
                variant="standard"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="cash" fullWidth
                name="cash"
                value={entity.cash}
                onChange={handleChange}
                label="Efectivo"
                variant="standard"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="creditCard"
                value={entity.creditCard}
                onChange={handleChange}
                label="Tarjeta de crédito"
                variant="standard"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <strong>TOTAL  ${total}</strong>
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

PaymentMethodDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  getEntity: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};


export default PaymentMethodDialog;
