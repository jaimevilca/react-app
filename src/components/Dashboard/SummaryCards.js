import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import LittleCard from "./LittleCard";

const SummaryCards = (props) => {
  const { data, setFilterSelected } = props;

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {data.map(({ title, icon, counter }, index) => (
        <Grid
          key={index.toString()}
          item
          xs={3}
          onClick={() => {
            setFilterSelected(title);
          }}
        >
          <LittleCard title={title} icon={icon} counter={counter} />
        </Grid>
      ))}
    </Grid>
  );
};

SummaryCards.propTypes = {
  data: PropTypes.array.isRequired,
  setFilterSelected: PropTypes.func.isRequired,
};

export default SummaryCards;
