import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "auto",
    },
  },
};

function StylistSelectChip(props) {
  const { names, updateParticipants, id } = props;
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    updateParticipants(id, value);
  };

  const getNameById = (id) => {
    if (names.length > 0) {
      const filterById = names.filter((i) => i.id === id);
      return filterById.length > 0 ? filterById[0].name : id;
    }

    return id;
  };

  return (
    <FormControl
      sx={{
        m: 1,
        width: 150,
        padding: 0,
        ".MuiSelect-select": {
          padding: 0.5,
        },
      }}
    >
      <Select
        labelId={"demo-multiple-chip-label" + id}
        id={"demo-multiple-chip" + id}
        multiple
        value={personName}
        onChange={handleChange}
        renderValue={(selected, x) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={getNameById(value)} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {names.map(({ id, name }, index) => (
          <MenuItem
            key={index.toString()}
            value={id}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

StylistSelectChip.propTypes = {
  names: PropTypes.array.isRequired,
  updateParticipants: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default StylistSelectChip;
