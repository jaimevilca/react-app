import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

function Client(props) {
  const { handleChange, form } = props;
  return (
    <Grid container spacing={1}>
      <Grid item lg={6} xs={12}>
        <TextField
          fullWidth
          name="clientName"
          onChange={handleChange}
          id="outlined-basic"
          label="Ingrese nombre cliente"
          variant="standard"
          error={!form.clientName}
          helperText={!form.clientName && 'Campo requerido'}
        />
      </Grid>
      <Grid item lg={3} xs={6}>
        <TextField
          id="standard-basic"
          name="clientPhone"
          onChange={handleChange}
          label="Teléfono"
          variant="standard"
        />
      </Grid>
      <Grid item lg={3} xs={3}>
        <TextField
          id="standard-basic"
          label="Email"
          name="clientEmail"
          onChange={handleChange}
          variant="standard"
        />
      </Grid>
    </Grid>
  );
}

Client.propTypes = {
  handleChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default Client;
