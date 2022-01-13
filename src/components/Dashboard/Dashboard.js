import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LittleCard from "./LittleCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import RefreshIcon from "@mui/icons-material/Refresh";
import CustomCard from "./CustomCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { list } from "../dummy/dashboard";
import { getMainCardIcon } from "../../utils/constants";
import SummaryCards from "./SummaryCards";

const Dashboard = (props) => {
  const ALL_OPTION = "ALL";
  const [data, setData] = useState([]);
  const [dataSummary, setDataSummary] = useState([]);
  const [filterSelected, setFilterSelected] = useState(ALL_OPTION);

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
          Last updated: {getCurrentDate()+' '}
          <Fab size="small" color="secondary" aria-label="add">
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
          Se encontraron <b>{data.length}</b> resultados
        </Typography>

        <Grid container spacing={3}>
          {data.map(({ title, subTitle, list, status }, index) => (
            <Grid key={index.toString()} item xs={4}>
              <CustomCard
                title={title}
                subTitle={subTitle}
                list={list}
                status={status}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
