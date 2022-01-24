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


const Search = (props) => {
  const { handleQuery } = props;
  let today = new Date();
  let date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + (today.getDate())).slice(-2);
  const [formData, setFormData] = React.useState({ status: "ALL", creationDateMin: date, creationDateMax: date });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  const handleClick = () => {
    let queryValue = [];
    if (formData.status && formData.status !== "ALL")
      queryValue.push(`status:${formData.status}`);
    if (formData.creationDateMin)
      queryValue.push(`creationDate>${(formData.creationDateMin).replaceAll("-", "")}`);
    if (formData.creationDateMax)
      queryValue.push(`creationDate<${(formData.creationDateMax).replaceAll("-", "")}`);
    handleQuery(queryValue);
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
        <Grid item lg={10} >
          <Grid container>
            <Grid item xs={6} lg={4}>
              <FormControl sx={{ m: 1, minWidth: 195 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Estado
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={formData.status}
                  name="status"
                  onChange={handleChange}
                >
                  <MenuItem value={"ALL"}>Todos</MenuItem>
                  <MenuItem value={"EN CAJA"}>EN CAJA</MenuItem>
                  <MenuItem value={"EN PROCESO"}>EN PROCESO</MenuItem>
                  <MenuItem value={"COMPLETADO"}>COMPLETADO</MenuItem>
                  <MenuItem value={"ANULADO"}>ANULADO</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            < Grid item xs={4}>
              <FormControl variant="standard" sx={{ m: 1 }}>
                <TextField
                  id="date"
                  label="Desde"
                  type="date"
                  name="creationDateMin"
                  defaultValue={formData.creationDateMin}

                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4} >
              <FormControl variant="standard" sx={{ m: 1 }}>
                <TextField
                  id="date"
                  label="Hasta"
                  type="date"
                  name="creationDateMax"

                  sx={{ width: "auto" }}
                  defaultValue={formData.creationDateMax}

                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Fab size="small" color="secondary" aria-label="Search" onClick={handleClick}>
            <SearchIcon />
          </Fab>
        </Grid>
      </Grid >
    </Paper >
  );
};

Search.propTypes = {
  handleQuery: PropTypes.func.isRequired,

};

export default Search;
