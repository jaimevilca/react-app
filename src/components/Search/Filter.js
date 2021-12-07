import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import Fab from "@mui/material/Fab";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

const Search = (props) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Paper>
      <Grid
        container
        spacing={2}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} >
          <Grid container>
            <Grid item xs={6} lg={6}>
              <FormControl  sx={{ m: 1, minWidth: 195 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Estado
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Estado"
                >
                  <MenuItem value="">
                    <em>Todos</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} lg={6}>
              <FormControl  sx={{ m: 1, minWidth: 195 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Estilista
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Estilista"
                >
                  <MenuItem value="">
                    <em>Todos</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ m: 1 }}>
                <TextField
                  id="date"
                  label="Desde"
                  type="date"
                  defaultValue="2017-05-24"
                  sx={{ width: "auto" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ m: 1 }}>
                <TextField
                  id="date"
                  label="Hasta"
                  type="date"
                  sx={{ width: "auto" }}
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Fab size="small" color="secondary" aria-label="Search">
            <SearchIcon />
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
};

Search.propTypes = {};

export default Search;
