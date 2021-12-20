import { types } from "../types/types";

export const setError = (err) => ({
  type: types.uiRemoveError,
  payload: err,
});

export const removeError = () => ({
  type: types.uiRemoveError,
});

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
});

export const openSnackbar = (type, message, duration=3000) => ({
  type: types.uiOpenSnackbar,
  payload: {
    type,
    message,
    duration
  },
});

export const closeSnackbar = () => ({
  type: types.uiCloseSnackbar,
});
