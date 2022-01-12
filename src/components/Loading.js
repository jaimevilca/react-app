import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Typography from "@mui/material/Typography";

export const Loading = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
      <Typography variant="overline" component="h2" sx={{marginLeft: 2}}>
       Cargando
      </Typography>      
    </Backdrop>
  );
};
