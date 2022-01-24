import React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Filter from "./Filter";
import Typography from "@mui/material/Typography";
import Detail from "./Detail";

const Search = (props) => {
  const [count, setCount] = React.useState(0);
  const [query, setQuery] = React.useState("");


  const updateCount = (count) => {
    setCount(count);

  };
  const handleQuery = (data) => {
    setQuery(data.join(" AND "));
    //  setQuery("creationDate>20220123 AND creationDate<20220123");

  };

  return (
    <>
      <Container
        maxWidth="lg"

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

        <Filter
          handleQuery={handleQuery}
        />
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

        <Detail updateCount={updateCount} query={query} />
      </Container>
    </>
  );
};

Search.propTypes = {};

export default Search;
