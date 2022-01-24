import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import MainButtons from "./MainButtons";
import Client from "./Client";
import OrderDetail from "./OrderDetail";
import ItemDialog from "./ItemDialog";
import { useForm } from "../../hooks/useForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../actions/ui";
import { CATEGORIES, ORDER, STATUS, USERS, ADMIN } from "../../utils/constants";
import {
  getAuth,
  postAuth,
  putAuth,
  patchAuth,
} from "../../utils/axiosHandler";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

function Order() {
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [detail, setDetail] = useState([]);
  const [items, setItems] = useState({});
  const [checked, setChecked] = React.useState([]);
  const { token, role } = useSelector((state) => state.auth);
  const [categories, setCategories] = React.useState([]);

  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  let params = useParams();
  let navigate = useNavigate();

  const initValues = {
    id: "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    status: "",
    validation: {
      clientName: {
        isInvalid: false,
        error: "",
      },
    },
  };

  const [form, handleChange, setData] = useForm(initValues);

  const setOrder = (data) => {
    const { orderDetails, clientName, clientPhone, clientEmail, id, status } =
      data;
    setChecked(orderDetails.map((i) => i.key));
    setDetail(orderDetails);
    setData({ ...form, clientName, clientPhone, clientEmail, id, status });
  };

  useEffect(() => {
    getAuth(USERS, token, ({ data }) => setUsers(data), null, dispatch);

    if (params.id) {
      getAuth(
        ORDER + "/" + params.id,
        token,
        ({ data }) => setOrder(data),
        null,
        dispatch
      );
    }
  }, []);

  useEffect(() => {
    getAuth(
      CATEGORIES,
      token,
      ({ data }) => setCategories(data),
      null,
      dispatch
    );
  }, []);

  const isValidateParticipants = () => {
    let emptyParticipants = "";

    detail.map((item, index) => {
      if (item.participants.length == 0) {
        emptyParticipants += " " + (index + 1) + ",";
      }
    });

    if (emptyParticipants) {
      emptyParticipants = emptyParticipants.substring(
        0,
        emptyParticipants.length - 1
      );
      dispatch(
        openSnackbar(
          "warning",
          "Estilista no seleccionado, verificar fila: " + emptyParticipants,
          5000
        )
      );
    }

    return !emptyParticipants;
  };

  const onSuccessSaveData = (response) => {
    setData({ ...form, id: response.data.id, status: response.data.status });
    dispatch(openSnackbar("success", "Se guardó la orden exitosamente"));
  };

  const resetData = () => {
    setDetail([]);
    setItems({});
    setChecked([]);
    setData(initValues);
    navigate("../order", { replace: true });
  };

  const onSuccessPay = () => {
    dispatch(openSnackbar("success", "Se envió a caja exitosamente"));
    resetData();
  };

  const sentToPay = () => {
    if (form.id) {
      patchAuth(
        ORDER + "/" + form.id + "/pay",
        {},
        token,
        onSuccessPay,
        null,
        dispatch
      );
    }
  };

  const saveData = () => {
    if (isValidateParticipants()) {
      const data = {
        ...form,
        orderDetails: [...detail],
      };
      if (!data.id) {
        postAuth(
          ORDER,
          data,
          token,
          (response) => onSuccessSaveData(response),
          null,
          dispatch
        );
      } else {
        putAuth(
          ORDER + "/" + data.id,
          data,
          token,
          (response) => onSuccessSaveData(response),
          null,
          dispatch
        );
      }
    }
  };

  const onSuccessComplete = () => {
    dispatch(openSnackbar("success", "Se cobró exitosamente"));
    resetData();
  };

  const complete = () => {
    if (form.id) {
      patchAuth(
        ORDER + "/" + form.id + "/complete",
        {},
        token,
        onSuccessComplete,
        null,
        dispatch
      );
    }
  };

  const onSuccesEdit = () => {
    dispatch(openSnackbar("success", "Se envió a edición exitosamente"));
    setData({ ...form, status: "EN PROCESO" });
  };

  const sentToEdit = () => {
    if (form.id) {
      patchAuth(
        ORDER + "/" + form.id + "/process",
        {},
        token,
        onSuccesEdit,
        null,
        dispatch
      );
    }
  };

  const onSuccesCancel = () => {
    dispatch(openSnackbar("warning", "Se anuló la orden " + form.id));
    resetData();
  };

  const sentToCancel = () => {
    if (form.id) {
      patchAuth(
        ORDER + "/" + form.id + "/cancel",
        {},
        token,
        onSuccesCancel,
        null,
        dispatch
      );
    }
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          marginTop: 3,
        }}
      >
        <Typography
          sx={{ textAlign: "center" }}
          variant="h5"
          gutterBottom
          component="div"
        >
          {form.id ? (
            <>
              Orden {form.id}{" "}
              <Chip
                label={form.status}
                color={
                  form.status === STATUS.COMPLETED
                    ? "success"
                    : form.status === STATUS.CANCELLED
                      ? "error"
                      : "primary"
                }
                variant="outlined"
              />
            </>
          ) : (
            "Agregar orden"
          )}
        </Typography>

        <MainButtons setItems={setItems} categories={categories} />

        <Client handleChange={handleChange} form={form} />

        {detail.length === 0 ? (
          <Alert sx={{ marginTop: 3, marginBottom: 2 }} severity="info">
            Ningún servicio agregado. Debe seleccionar al menos un servicio{" "}
          </Alert>
        ) : (
          <>
            <OrderDetail
              setDetail={setDetail}
              detail={detail}
              names={users}
              setChecked={setChecked}
            />
            <Box sx={{ textAlign: "center", paddingTop: 2 }}>
              {(!form.status || form.status === STATUS.PROCESS) && (
                <Button variant="outlined" color="secondary" onClick={saveData}>
                  Guardar
                </Button>
              )}

              {![STATUS.COMPLETED, STATUS.IN_BOX, STATUS.CANCELLED].includes(
                form.status
              ) && (
                  <Button
                    sx={{ marginLeft: 3 }}
                    variant="contained"
                    color="secondary"
                    onClick={sentToPay}
                  >
                    Enviar a caja
                  </Button>
                )}

              {role === ADMIN && form.status === STATUS.IN_BOX && (
                <Button
                  sx={{ marginLeft: 3 }}
                  variant="outlined"
                  color="primary"
                  onClick={sentToEdit}
                >
                  Enviar a edición
                </Button>
              )}

              {role === ADMIN && form.status === STATUS.IN_BOX && (
                <Button
                  sx={{ marginLeft: 3 }}
                  variant="outlined"
                  color="error"
                  onClick={sentToCancel}
                >
                  Anular
                </Button>
              )}

              {role === ADMIN && form.status === STATUS.IN_BOX && (
                <Button
                  sx={{ marginLeft: 3 }}
                  variant="contained"
                  color="success"
                  onClick={complete}
                >
                  Cobrar
                </Button>
              )}
            </Box>
          </>
        )}
        <ItemDialog
          items={items}
          isOpenDialog={isOpenDialog}
          setItems={setItems}
          setDetail={setDetail}
          detail={detail}
          setOpenDialog={setOpenDialog}
          checked={checked}
          setChecked={setChecked}
        />
      </Container>
    </>
  );
}

export default Order;
