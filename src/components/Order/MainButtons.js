import React from "react";
import Fab from "@mui/material/Fab";
import GirlIcon from "@mui/icons-material/Girl";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import { createOrder } from "../dummy/createOrder";

function MainButtons(props) {
  const {  setItems } = props;

  const setSubItems = (idx) => {
    setItems(createOrder[idx].childs);    
  }

  return (
    <>
      <Grid container spacing={1} alignItems="center">        
        {createOrder.map(({ id, name, icon }, index) => 
          <Grid key={index.toString()} item xs={4} sx={{ textAlign: "center" }}>
            <Fab
              color="secondary"
              aria-label=""
              size="large"
              sx={{ width: 80, height: 80 }}
              onClick={() => setSubItems(index)}
            >
              <Icon sx={{ fontSize: 50 }}>{icon}</Icon>              
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
              {name}
            </Typography>
          </Grid>
        )}
      </Grid>
      
    </>
  );
}

MainButtons.propTypes = {  
  setItems: PropTypes.func.isRequired,
};

export default MainButtons;
