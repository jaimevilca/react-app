import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function ItemDialog(props) {
  const { isOpenDialog, setOpenDialog } = props;

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const data = [
    {
      title: "Alisados",
      rows: [
        { id: 0, description: "Item1 dfdfd Item1 dfdfd ", price: 100 },
        {
          id: 1,
          description: "Item2 Item1 dfdfd Item1 dfdfd",
          price: [100, 200, 300, 400],
        },
        { id: 2, description: "Item1 dfdfd Item1 dfdfd ", price: 100 },
      ],
    },
  ];

  const [priceMultiple, setMultiplePrice] = React.useState({});

  const handleChangePriceSelect = (value, id) => {
    setMultiplePrice({ ...priceMultiple, [id]: value });
  };

  const getPrice = (prices, id) => {
    if (typeof prices === "number") {
      return (
        <Typography
          sx={{ paddingRight: 6 }}
          variant="button"
          display="inline-block"
        >
          {prices}
        </Typography>
      );
    }

    if (!(id in priceMultiple)) {
      setMultiplePrice({ ...priceMultiple, [id]: prices[0] });
    }

    return (
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 60, marginTop: -1 }}
      >
        <Select
          labelId={"label" + id}
          id={"label" + id}
          value={priceMultiple[id]}
          defaultValue={prices[0]}
          onChange={({ target: { value } }) =>
            handleChangePriceSelect(value, id)
          }
          label="Age"
        >
          {prices.map((price, index) => (
            <MenuItem key={index.toString()} value={price}>
              {price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const getListItems = (rows) => {
    return (
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        disablePadding
      >
        {rows.map(({ id, description, price }) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={id.toString()}
              secondaryAction={
                <div>
                  <AttachMoneyIcon sx={{ fontSize: 13 }} />
                  {getPrice(price, id)}
                </div>
              }
              disableGutters
              sx={{ paddingRight: 0 }}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(id)}
                dense
                sx={{ padding: 0 }}
              >
                <>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                </>
                <ListItemText id={labelId} primary={`${description}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Dialog
      open={isOpenDialog}
      fullWidth
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {data.map((tab, index) => (
                <Tab key={index} label={tab.title} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>

          {data.map((tab, index) => (
            <TabPanel value={value} key={index} index={index}>
              <>
              {getListItems(tab.rows, index)}
              </>
            </TabPanel>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ItemDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
};

export default ItemDialog;
