import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { getColor } from "../../utils/constants";

const OrderDetailDialog = (props) => {
  const { order, open, handleClose } = props;
  const [total, setTotal] = useState([]);

  useEffect(() => {
    setTotal(0);
    if (order.detail && order.detail.length > 0) {
      let newTotal = 0;
      order.detail.map((item) => {
        newTotal += +item.price;
      });
      setTotal(newTotal);
    }
  }, [order]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Orden ID: {order.id}
        <Chip
          sx={{ marginLeft: 2 }}
          label={order.status}
          color={getColor(order.status)}
        />
      </DialogTitle>
      <DialogContent>
        <Divider />

        <Grid container spacing={0} sx={{ marginTop: 2, marginBottom: 1 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <b>Cliente: </b>
              {order.title}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <b>Correo: </b>test@test.com
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <b>Telefono: </b>27777
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <b>Creado: </b>
              {order.subTitle}
            </Typography>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Servicio</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="center">Estilista</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.detail &&
                order.detail.map(
                  ({ description, price, key, participants }, index) => (
                    <TableRow
                      key={index.toString()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{description}</TableCell>
                      <TableCell align="right" sx={{ padding: 0 }}>
                        ${price}
                      </TableCell>
                      <TableCell align="right">
                        {participants.join(", ")}
                      </TableCell>
                    </TableRow>
                  )
                )}

              <TableRow>
                <TableCell></TableCell>
                <TableCell variant="head" align="center" sx={{ padding: 0 }}>
                  TOTAL
                </TableCell>
                <TableCell variant="head" align="right" sx={{ padding: 0 }}>
                  ${total}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

OrderDetailDialog.propTypes = {
  order: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default OrderDetailDialog;
