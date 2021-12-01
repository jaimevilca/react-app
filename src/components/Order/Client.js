import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function Client() {
  return (
    <Grid container spacing={1}>
      <Grid item lg={6} xs={12}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Ingrese nombre cliente"
          variant="standard"
        />
      </Grid>
      <Grid item lg={3} xs={6}>
        <TextField id="standard-basic" label="Teléfono" variant="standard" />
      </Grid>
      <Grid item lg={3} xs={3}>
        <TextField id="standard-basic" label="Email" variant="standard" />
      </Grid>
    </Grid>
  );
}

export default Client;
