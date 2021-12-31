import React from "react";
import Fab from "@mui/material/Fab";
import GirlIcon from "@mui/icons-material/Girl";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";

function MainButtons(props) {
  const {  setItems, categories } = props;

  const setSubItems = (idx) => {
    setItems(categories[idx]);    
  }

  return (
    <>
      <Grid container spacing={1} alignItems="center">        
        {categories.map(({ id, name, icon }, index) => 
          <Grid key={index.toString()} item xs={3} sx={{ textAlign: "center" }}>
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
  categories: PropTypes.array.isRequired,
};

export default MainButtons;
