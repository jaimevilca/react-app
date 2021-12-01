import React from "react";
import Container from "@mui/material/Container";
import MainButtons from "./MainButtons";
import Client from "./Client";
import OrderDetail from "./OrderDetail";
import Buttons from "./Buttons";
import ItemDialog from './ItemDialog';

function Order() {

  const [isOpenDialog, setOpenDialog] = React.useState(false);


  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: 3,
        }}
      >
        <MainButtons isOpenDialog={isOpenDialog} setOpenDialog={setOpenDialog}/>

        <Client />
        <OrderDetail />
        <Buttons/>
        
        <ItemDialog isOpenDialog={isOpenDialog} setOpenDialog={setOpenDialog}/>
      </Container>
    </>
  );
}



export default Order;
