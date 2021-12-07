import React from "react";
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
import Divider from '@mui/material/Divider';


const mainCards = [
  {
    title: "En proceso",
    counter: 4,
    icon: <SettingsIcon sx={{ fontSize: 60, padding: 2 }} />,
  },
  {
    title: "Realizados",
    counter: 0,
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 60, padding: 2 }} />,
  },
  {
    title: "Anulados",
    counter: 1,
    icon: <CancelPresentationIcon sx={{ fontSize: 60, padding: 2 }} />,
  },
];


const cards = [
  {
    title: "Cliente XYZ",
    subTitle: "13/11/2021 10:35 AM",
    list: [
      { description: "Estilista", counter: 1, icon: "woman" },
      { description: "Servicios contratados", counter: 1, icon: "" },
    ],
    status: 'En proceso'
  },
];

function generate(element) {
  return [0, 1].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Dashboard = (props) => {
 



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
          Last updated: 2021-11-10 14:45{" "}
          <Fab size="small" color="secondary" aria-label="add">
            <RefreshIcon />
          </Fab>
        </Typography>

        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {mainCards.map(({ title, icon, counter }, index) => (
            <Grid key={index.toString()} item xs={4}>
              <LittleCard title={title} icon={icon} counter={counter} />
            </Grid>
          ))}
        </Grid>

        
        <Typography sx={{ marginTop: 5 }} variant="overline" display="block" gutterBottom>
          Se encontraron <b>N</b> resultados
        </Typography>



        <Grid
          container
          spacing={3}
        >

        {cards.map(({ title, subTitle, list, status}, index) => 
          <Grid key={index.toString()} item xs={4}><CustomCard title={title} subTitle={subTitle} list={list} status={status} />
            </Grid>
        )}

</Grid>
      </Container>
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
