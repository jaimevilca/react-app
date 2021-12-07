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
import WomanIcon from "@mui/icons-material/Woman";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import PropTypes from "prop-types";
import CardActions from "@mui/material/CardActions";

const CustomCard = (props) => {
  const { title, subTitle, list, status } = props;

  return (
    <Card sx={{ maxWidth: 280, position: "relative" }}>
      <Chip
        label={status}
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
      <CardHeader
        title={title}
        subheader={subTitle}
        sx={{ paddingBottom: 0 }}
        action={
          <IconButton aria-label="settings">
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
                {icon === "woman" ? <WomanIcon /> : <ContentCutIcon />}
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
};

export default CustomCard;
