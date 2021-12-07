import React, { useEffect } from "react";
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
  const {
    isOpenDialog,
    setOpenDialog,
    items,
    setItems,
    setDetail,
    detail,
    checked,
    setChecked,
  } = props;

  useEffect(() => {
    if (items.length > 0) {
      setOpenDialog(true);
    }
  }, [items]);

  const handleClose = () => {
    setOpenDialog(false);
    setItems([]);
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

  const [priceMultiple, setMultiplePrice] = React.useState({});

  const handleChangePriceSelect = (value, id, idSection) => {
    const key = "s" + idSection + "|" + id;
    setMultiplePrice({ ...priceMultiple, [key]: value });

    const updatePriceDetail = detail.map((d) =>
      d.key === key ? { ...d, price: value } : d
    );
    setDetail(updatePriceDetail);
  };

  const getPrice = (idSection, id, prices) => {
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

    if (!("s" + idSection + "|" + id in priceMultiple)) {
      setMultiplePrice({
        ...priceMultiple,
        ["s" + idSection + "|" + id]: prices[0],
      });
    }

    return (
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 60, marginTop: -1 }}
      >
        <Select
          labelId={"label" + idSection + "- " + id}
          id={"label" + idSection + "- " + id}
          value={priceMultiple["s" + idSection + "|" + id]}
          onChange={({ target: { value } }) =>
            handleChangePriceSelect(value, id, idSection)
          }
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

  const isChecked = (idSection, id) => {
    return checked.indexOf("s" + idSection + "|" + id) !== -1;
  };

  const addDetail = (id, key, description, price) => {
    setDetail([...detail,
      {
        id,
        key,
        price: typeof price === "number" ? price :  priceMultiple[key],
        description,
        participants: []
      }]);
  };

  const removeDetail = (key) => {
    const filterDetail = detail.filter((det) => det.key != key);
    setDetail(filterDetail);

    //setChecked(newChecked);
  };

  const handleToggle = (idSection, id, description, price) => () => {
    const value = "s" + idSection + "|" + id;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      addDetail(id, value, description, price);
      newChecked.push(value);
    } else {
      removeDetail(value);
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const getListItems = (idSection, rows) => {
    return (
      <List sx={{ width: "100%", bgcolor: "background.paper" }} disablePadding>
        {rows.map(({ id, detail, price }, idx) => {
          const labelId = `checkbox-list-label-${id}-${idSection}`;

          return (
            <ListItem
              key={idx.toString() + "_" + idSection}
              secondaryAction={
                <div>
                  <AttachMoneyIcon sx={{ fontSize: 13 }} />
                  {getPrice(idSection, id, price)}
                </div>
              }
              disableGutters
              sx={{ paddingRight: 0 }}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(idSection, id, detail, price)}
                dense
                sx={{ padding: 0 }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isChecked(idSection, id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>

                <ListItemText id={labelId} primary={`${detail}`} />
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
              {items.map((tab, index) => (
                <Tab key={index} label={tab.name} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>

          {items.map((tab, index) => (
            <TabPanel value={value} key={index} index={index}>
              {getListItems(tab.id, tab.items)}
            </TabPanel>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ItemDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  setItems: PropTypes.func.isRequired,
  setDetail: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  detail: PropTypes.array.isRequired,

  checked: PropTypes.array.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default ItemDialog;
