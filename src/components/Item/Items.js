import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Detail from "./Detail";

const Items = (props) => {

  const [count, setCount] = React.useState(0);
  const updateCount = (count) => {
    setCount(count);

  };

  return (

    <>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: 3,
        }}
      >
        <Typography
          sx={{ textAlign: "center", marginBottom: 3 }}
          variant="h5"
          gutterBottom
          component="div"
        >
          Items
        </Typography>

      </Container>

      <Container
        maxWidth="lg"
        sx={{
          marginTop: 3,
        }}
      >
        <Typography variant="overline" display="block" gutterBottom>
          Se encontraron <b>{count}</b> resultados
        </Typography>

        <Detail updateCount={updateCount} />

      </Container>

    </>
  );
};

Items.propTypes = {};

export default Items;
