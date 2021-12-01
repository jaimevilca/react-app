import React from "react";
import Fab from "@mui/material/Fab";
import GirlIcon from "@mui/icons-material/Girl";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AirlineSeatFlatAngledIcon from '@mui/icons-material/AirlineSeatFlatAngled';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PropTypes from "prop-types";

function MainButtons(props) {

  const {     
    setOpenDialog
  } = props;

  return (
    <>
      <Grid container spacing={1}  alignItems="center">
        <Grid item xs={4} sx={{textAlign: 'center'}}>
          <Fab
            color="secondary" aria-label="" size="large"
            sx={{ width: 80, height: 80, }}
            onClick={ ()=> setOpenDialog(true)}
          >
            <GirlIcon sx={{fontSize: 50}}/>
          </Fab>
          <Typography
            variant="button"
            display="block"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "secondary.main",
              marginTop: 1,
            }}
          >
            Alisado
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{textAlign: 'center'}}>
          <Fab
            color="secondary" aria-label="" size="large"
            sx={{width: 80, height: 80, }}
          >
            <AirlineSeatFlatAngledIcon sx={{fontSize: 50}}/>
          </Fab>
          <Typography
            variant="button"
            display="block"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "secondary.main",
              marginTop: 1,
            }}
          >
            Spa
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{textAlign: 'center'}}>
          <Fab
            color="secondary" aria-label="" size="large"
            sx={{width: 80, height: 80, }}
          >
            <ContentCutIcon sx={{fontSize: 50}}/>
          </Fab>
          <Typography
            variant="button"
            display="block"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "secondary.main",
              marginTop: 1,
            }}
          >
            Corte
          </Typography>
        </Grid>
        
      </Grid>
    </>
  );
}

MainButtons.propTypes = {  
  setOpenDialog: PropTypes.func.isRequired,
};


export default MainButtons;
