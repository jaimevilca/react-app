import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import RefreshIcon from "@mui/icons-material/Refresh";
import CustomCard from "./CustomCard";
import { getMainCardIcon } from "../../utils/constants";
import SummaryCards from "./SummaryCards";
import { useNavigate } from "react-router-dom";
import OrderDetailDialog from "./OrderDetailDialog";
import { ORDER } from "../../utils/constants";
import { getAuth } from "../../utils/axiosHandler";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = (props) => {
  const ALL_OPTION = "ALL";
  const [data, setData] = useState([]);
  const [dataSummary, setDataSummary] = useState([]);
  const [list, setList] = useState([]);
  const [filterSelected, setFilterSelected] = useState(ALL_OPTION);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getCountByStatus = (status) => {
    let counts = {};
    for (const num of status) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
  };

  const setMainData = () => {
    const allStatus = list.map((item) => item.status);
    const countByStatus = getCountByStatus(allStatus);
    const status = [...new Set(allStatus)];

    const dataMainCards = status.map((i) => {
      return {
        icon: getMainCardIcon[i],
        title: i,
        counter: countByStatus[i],
      };
    });

    setDataSummary(dataMainCards);
  };

  const successData = (orders) => {
    setList(orders.data);
  };

  const updateData = () => {
    setFilterSelected(ALL_OPTION);
    getAuth(ORDER + "/dashboard", token, (orders) => successData(orders), null, dispatch);
  };


  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      if (dataSummary.length === 0) {
        setMainData();
      }

      if (filterSelected === ALL_OPTION) {
        setData(list);
      } else {
        setData(list.filter((item) => item.status === filterSelected));
      }
    }
  }, [list, filterSelected]);



  const getCurrentDate = () => {
    let d = new Date();
    let dformat =
      [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
      " " +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
    return dformat;
  };

  let navigate = useNavigate();
  const editOrder = (id) => {
    navigate("../order/" + id, { replace: true });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [detailOrder, setDetailOrder] = useState({});

  const handleClose = () => {
    setOpenDialog(false);
  };

  const openOrder = (order) => {
    setDetailOrder(order);
    setOpenDialog(true);
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
          Dashboard
        </Typography>

        <Typography
          sx={{ textAlign: "center", marginBottom: 3 }}
          variant="caption"
          display="block"
        >
          Last updated: {getCurrentDate() + " "}
          <Fab size="small" color="secondary" aria-label="add" onClick={updateData}>
            <RefreshIcon />
          </Fab>
        </Typography>

        <SummaryCards
          data={dataSummary}
          setFilterSelected={setFilterSelected}
        />

        <Typography
          sx={{ marginTop: 5 }}
          variant="overline"
          display="block"
          gutterBottom
        >
          Se encontraron <b>{!data ? null : data.length}</b> resultados
        </Typography>

        <Grid container spacing={3}>
          {!data ? null : data.map((order, index) => (
            <Grid key={index.toString()} item xs={4}>
              <CustomCard
                title={order.title}
                subTitle={order.subtitle}
                list={order.list}
                editOrder={() => editOrder(order.id)}
                openOrder={() => openOrder(order)}
                status={order.status}
              />
            </Grid>
          ))}
        </Grid>

        <OrderDetailDialog
          order={detailOrder}
          open={openDialog}
          handleClose={handleClose}
        />
      </Container>
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
