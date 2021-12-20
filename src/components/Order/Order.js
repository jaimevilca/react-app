import React, { useState } from "react";
import Container from "@mui/material/Container";
import MainButtons from "./MainButtons";
import Client from "./Client";
import OrderDetail from "./OrderDetail";
import ItemDialog from "./ItemDialog";
import { names } from "../dummy/createOrder";
import { useForm } from "../../hooks/useForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../actions/ui";
import { ORDER } from "../../utils/constants";
import { postAuth } from "../../utils/axiosHandler";
import { useSelector } from "react-redux";

function Order() {
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [detail, setDetail] = useState([]);

  const [items, setItems] = useState([]);
  const [checked, setChecked] = React.useState([]);

  const { token } = useSelector((state) => state.auth);

  const initValues = {
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    orderDetails: [],
  };

  const [form, handleChange] = useForm(initValues);
  const dispatch = useDispatch();

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
          "Estilista no seleccionado, verificar fila: " +
            emptyParticipants, 5000
        )
      );
    }
    
    return !emptyParticipants;
  };

  const onSuccessSaveData = (data) => {
    console.log(data);
  }

  const saveData = () => {
    if (isValidateParticipants()) {
      const data = {
        ...form,
        orderDetails: [...detail],
      };
      
      postAuth(ORDER, data, token, onSuccessSaveData, null, dispatch);

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
        <MainButtons setItems={setItems} />

        <Client handleChange={handleChange} />

        {detail.length === 0 ? (
          <Alert sx={{ marginTop: 3, marginBottom: 2 }} severity="info">
            Ningún servicio agregado. Debe seleccionar al menos un servicio{" "}
          </Alert>
        ) : (
          <>
            <OrderDetail
              setDetail={setDetail}
              detail={detail}
              names={names}
              setChecked={setChecked}
            />
            <Box sx={{ textAlign: "center", paddingTop: 2 }}>
              <Button variant="outlined" color="secondary" onClick={saveData}>
                Guardar y cerrar
              </Button>

              <Button
                sx={{ marginLeft: 3 }}
                variant="contained"
                color="secondary"
              >
                Enviar a caja
              </Button>
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
