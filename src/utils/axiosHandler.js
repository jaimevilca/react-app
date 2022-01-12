import { finishLoading, startLoading } from "../actions/ui";
import axios from "axios";

export const post = (url, params, successHandler, errorHandler, dispatch) => {
  dispatch(startLoading());

  axios
    .post(url, params)
    .then(async (data) => {
      await successHandler(data);
      dispatch(finishLoading());
    })
    .catch((error) => {
      if (errorHandler) {
        errorHandler(error);
      }
      console.log("error", error);
      dispatch(finishLoading());
    });
};

export const postAuth = (
  url,
  params,
  token,
  successHandler,
  errorHandler,
  dispatch
) => {
  const config = {
    headers: { Authorization: `${token}` },
  };
  dispatch(startLoading());
  axios
    .post(url, params)
    .then(async (data) => {
      await successHandler(data);
      dispatch(finishLoading());
    })
    .catch((error) => {
      if (errorHandler) {
        errorHandler(error);
      }
      console.log("error", error);
      dispatch(finishLoading());
    });
};

export const putAuth = (
  url,
  params,
  token,
  successHandler,
  errorHandler,
  dispatch
) => {
  const config = {
    headers: { Authorization: `${token}` },
  };
  dispatch(startLoading());
  axios
    .put(url, params, config)
    .then(async (data) => {
      await successHandler(data);
      dispatch(finishLoading());
    })
    .catch((error) => {
      if (errorHandler) {
        errorHandler(error);
      }
      console.log("error", error);
      dispatch(finishLoading());
    });
};

export const patchAuth = (
  url,
  params,
  token,
  successHandler,
  errorHandler,
  dispatch
) => {
  const config = {
    headers: { Authorization: `${token}` },
  };
  dispatch(startLoading());
  axios
    .patch(url, params, config)
    .then(async (data) => {
      await successHandler(data);
      dispatch(finishLoading());
    })
    .catch((error) => {
      if (errorHandler) {
        errorHandler(error);
      }
      console.log("error", error);
      dispatch(finishLoading());
    });
};

export const getAuth = (
  url,  
  token,
  successHandler,
  errorHandler,
  dispatch
) => {
  const config = {
    headers: { Authorization: `${token}` },
  };
  dispatch(startLoading());
  axios
    .get(url)
    .then(async (data) => {
      await successHandler(data);
      dispatch(finishLoading());
    })
    .catch((error) => {
      if (errorHandler) {
        errorHandler(error);
      }
      console.log("error", error);
      dispatch(finishLoading());
    });
};
