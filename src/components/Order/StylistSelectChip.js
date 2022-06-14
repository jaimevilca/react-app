import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../actions/ui";


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
  const { names, updateParticipants, id, initParticipants, isCompound } = props;
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(initParticipants);
  function getStyles(name, personName) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const dispatch = useDispatch();

  useEffect(() => {
    setPersonName(initParticipants);
  }, [initParticipants])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;


    if ((isCompound && value.length <= 2) || (!isCompound && value.length <= 1)) {
      updateParticipants(id, value);
    } else if (isCompound) {
      dispatch(openSnackbar('info', 'Solo puede agregar máximo 2 participantes'));
    } else {
      dispatch(openSnackbar('info', 'Solo puede elegir máximo un participante'));

    }
  };

  const getName = (username) => {
    if (names.length > 0) {
      const filterById = names.filter((i) => i.username === username);
      return filterById.length > 0 ? filterById[0].username : username;
    }

    return username;
  };

  return (
    <FormControl
      sx={{
        m: 1,
        width: 350,
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
              <Chip key={value} label={getName(value)} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {names.map(({ username }, index) => (
          <MenuItem
            key={index.toString()}
            value={username}
            style={getStyles(username, personName)}
          >
            {username}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

StylistSelectChip.propTypes = {
  names: PropTypes.array.isRequired,
  updateParticipants: PropTypes.func.isRequired,
  initParticipants: PropTypes.array.isRequired,
  id: PropTypes.string,
};

StylistSelectChip.defaultProps = {
  id: '',
}

export default StylistSelectChip;
