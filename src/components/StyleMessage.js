import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@mui/material/Snackbar";

import { Alert } from "@mui/material";
import { closeSnackbar } from "../actions/ui";

export const StyleMessage = () => {
  const dispatch = useDispatch();
  const { isOpenSnackbar, message, duration, type } = useSelector(
    (state) => state.ui
  );

  return (
    <Snackbar
      open={isOpenSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={duration}
      onClose={() => dispatch(closeSnackbar())}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
      {message}
      </Alert>
    </Snackbar>
  );
};
