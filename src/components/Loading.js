import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { closeSnackbar } from "../actions/ui";

export const Loading = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state) => state.ui
  );

  return (
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}    
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  );
};
