import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import { getColor } from "../../utils/constants";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const CustomCard = (props) => {
  const { title, subTitle, list, status, editOrder, openOrder } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openOrderMenu = (e) => {
    handleClose();
    openOrder(e);
  };

  return (
    <Card sx={{ maxWidth: 280, position: "relative" }}>
      <Chip
        label={status}
        color={getColor(status)}
        sx={{
          borderRadius: 0,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          marginLeft: "auto",
          marginRight: "auto",
          height: 20,
        }}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={openOrderMenu}>
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <ListItemText>Ver orden</ListItemText>
        </MenuItem>
        <MenuItem onClick={editOrder}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Editar orden</ListItemText>
        </MenuItem>
      </Menu>

      <CardHeader
        title={title}
        subheader={subTitle}
        sx={{ paddingBottom: 0 }}
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardContent sx={{ padding: 0 }}>
        <List dense sx={{ paddingBottom: 0 }}>
          {list.map(({ counter, description, icon }) => (
            <ListItem
              secondaryAction={<Chip label={counter} variant="outlined" />}
            >
              <ListItemIcon>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={description} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

CustomCard.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  editOrder: PropTypes.func.isRequired,
  openOrder: PropTypes.func.isRequired,
};

export default CustomCard;
