import React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Filter from "./Filter";
import Typography from "@mui/material/Typography";
import Detail from "./Detail";

const Search = (props) => {
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
          Buscar pedidos
        </Typography>

        <Filter />
      </Container>

      <Container
        maxWidth="lg"
        sx={{
          marginTop: 3,
        }}
      >
        <Typography variant="overline" display="block" gutterBottom>
          Se encontraron <b>N</b> resultados
        </Typography>

        <Detail />
      </Container>
    </>
  );
};

Search.propTypes = {};

export default Search;
