import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: null,
  isOpenSnackbar: false
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };

    case types.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };

    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };
    
    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };
    
    case types.uiOpenSnackbar:
        return {
          ...state,
          isOpenSnackbar: true,
          type: action.payload.type,
          message: action.payload.message,
          duration: action.payload.duration,          
        };
    case types.uiCloseSnackbar:
        return {
          ...state,
          isOpenSnackbar: false,
        };

    default:
      return state;
  }
};
