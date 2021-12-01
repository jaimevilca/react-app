import React from "react";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button'


function Buttons() {
  return (
    <Grid container >

      <Grid item sx={{ margin: '0 auto', paddingTop: 2}}>
        
        <Button  variant="outlined" color="secondary">
          Cerrar y guardar
        </Button>

        <Button sx={{ marginLeft: 3 }} variant="contained" color="secondary">
          Enviar a caja
        </Button>
      </Grid>
      
    </Grid>
  );
}

export default Buttons;
