import React, { useState } from "react";
import Container from "@mui/material/Container";
import MainButtons from "./MainButtons";
import Client from "./Client";
import OrderDetail from "./OrderDetail";
import ItemDialog from "./ItemDialog";
import { names } from "../dummy/createOrder";
import { useForm } from "../../hooks/useForm";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function Order() {
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [detail, setDetail] = useState([]);

  const [items, setItems] = useState([]);
  const [checked, setChecked] = React.useState([]);

  const initValues = {
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    orderDetails: [],
  };

  const [form, handleChange] = useForm(initValues);

  const saveData = () => {
    const data = {
      ...form,
      orderDetails: [...detail]
    };
    
    console.log("form", data);
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: 3,
        }}
      >
        <MainButtons setItems={setItems} />

        <Client handleChange={handleChange} />
        <OrderDetail
          setDetail={setDetail}
          detail={detail}
          names={names}
          setChecked={setChecked}
        />

        <Grid item sx={{ margin: "0 auto", paddingTop: 2 }}>
          <Button variant="outlined" color="secondary" onClick={saveData}>
            Cerrar y guardar
          </Button>

          <Button sx={{ marginLeft: 3 }} variant="contained" color="secondary">
            Enviar a caja
          </Button>
        </Grid>

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
