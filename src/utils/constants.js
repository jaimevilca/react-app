export const BASE_URL = "http://localhost:8080";
export const LOGIN = BASE_URL + "/users/login";
export const ORDER = BASE_URL + "/orders";
export const CATEGORIES = BASE_URL + "/categories";
export const USERS = BASE_URL + "/users";

export const ADMIN = "ADMIN";

export const STATUS = {
  PROCESS: "EN PROCESO",
  IN_BOX: "EN CAJA",
  COMPLETED: "COMPLETADO",
  CANCELLED: "ANULADO",
};

export const getColor = (status) => {
  switch (status) {
    case STATUS.PROCESS:
      return "primary";
    case STATUS.IN_BOX:
      return "secondary";
    case STATUS.COMPLETED:
      return "success";
    case STATUS.CANCELLED:
      return "error";
  }
};

export const getMainCardIcon = {
  [STATUS.PROCESS]: "settings",
  [STATUS.IN_BOX]: "payments",
  [STATUS.COMPLETED]: "check_circle_outline",
  [STATUS.CANCELLED]: "delete_forever",
};
