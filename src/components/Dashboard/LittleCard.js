import React from "react";
import PropTypes from "prop-types";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";

const LittleCard = (props) => {
  const { title, counter, icon } = props;
  return (
    <Paper
      sx={{
        display: "flex",
        paddingTop: 2,
        paddingLeft: 2,
        paddingBottom: 2,
        margin: "0 auto",
        maxWidth: 200,
        maxHeight: 80,
      }}
    >
      <div>
        <Typography variant="h4" component="div" gutterBottom>
          {counter}
        </Typography>

        <Typography variant="subtitle1" component="div">
          {title}
        </Typography>
      </div>

      <div sx={{ textAlign: "right" }}>
        {icon}        
      </div>
    </Paper>
  );
};

LittleCard.propTypes = {
  title: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  icon: PropTypes.object.isRequired,
};

export default LittleCard;
