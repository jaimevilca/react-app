import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import { getColor } from "../../utils/constants";

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
        borderColor: getColor(title) + '.main',
        color: getColor(title) + '.main',
        borderWidth: 1,
        borderStyle: 'solid',
        cursor: 'pointer'
      }}
    >
      <div>
        <Typography variant="h4" component="div" gutterBottom >
          {counter}
        </Typography>

        <Typography variant="subtitle1" component="div">
          {title}
        </Typography>
      </div>

      <div>
        <Icon sx={{ fontSize: 80 }}>{icon}</Icon>
      </div>
    </Paper>
  );
};

LittleCard.propTypes = {
  title: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default LittleCard;
