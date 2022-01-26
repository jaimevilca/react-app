import React, { useEffect, useRef } from "react";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import { getAuth } from "../../utils/axiosHandler";
import { REPORTS } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import SearchIcon from "@mui/icons-material/Search";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CommissionReport() {
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState('');

  const [expandedAll, setExpandedAll] = React.useState(false);


  const [users, setUsers] = React.useState([]);


  const componentRef = useRef();

  let today = new Date();
  let date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + (today.getDate())).slice(-2);

  const [dateSearch, setDateSearch] = React.useState(date);


  const print = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    setExpandedAll(true);
    setTimeout(() => {
      print();
    }, 1000);

  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setExpandedAll(false);
  };

  const getItems = (data) => {
    console.log(data);
    setUsers(data);
  };

  const search = () => {
    var creationDateMax = new Date(dateSearch);
    creationDateMax.setDate(creationDateMax.getDate() + 1);
    creationDateMax = (creationDateMax.toISOString()).replaceAll("-", "").substring(0, 8);
    const query = `creationDate>${(dateSearch).replaceAll("-", "")} AND creationDate<${creationDateMax}`;
    getAuth(REPORTS + "/commission-report?search=" + query, token, ({ data }) => getItems(data), null, dispatch);
  };




  return (
    <Container
      maxWidth="lg"

      sx={{
        marginTop: 3,
      }}
    >
      <Container
        maxWidth="md"

        sx={{
          marginTop: 3,
        }}
      >
        <Paper>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >




            <Grid item lg={10} >
              <Grid container>


                <Grid item xs={12} >
                  <FormControl variant="standard" sx={{ m: 1 }}>
                    <TextField
                      id="date"
                      label="Fecha"
                      type="date"
                      name="creationDate"
                      defaultValue={date}
                      sx={{ width: "auto" }}
                      onChange={e => setDateSearch(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={1}>
              <Fab size="small" color="secondary" aria-label="Search" onClick={search}>
                <SearchIcon />
              </Fab>
            </Grid>
            <Grid item xs={1}>
              <Fab size="small" color="primary" aria-label="Print" onClick={handlePrint}>
                <PrintIcon />
              </Fab>
            </Grid>
          </Grid >
        </Paper>
      </Container>

      <div ref={componentRef}  >
        <Typography
          sx={{ textAlign: "center", marginBottom: 3, marginTop: 5 }}
          variant="h5"
          gutterBottom
          component="div"

        >
          Reporte de comisiones {dateSearch}
        </Typography>


        {users && users.map((row, index) => (
          <Accordion expanded={expanded === row.username || expandedAll} onChange={handleChange(row.username)}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Usuario : {row.username}  Total : ${row.total}</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <TableContainer >
                <Table dense sx={{}} aria-label="simple table" size="small">
                  <TableHead sx={{ backgroundColor: '#dbdbdb' }}>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell >Orden</TableCell>
                      <TableCell >Estado de orden</TableCell>
                      <TableCell >Descripcion</TableCell>
                      <TableCell >Total venta</TableCell>
                      <TableCell >Comisión</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.items && row.items.map((item, index) => (
                      <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell >{item.orderClient} - {item.orderId}</TableCell>
                        <TableCell >{item.orderStatus}</TableCell>
                        <TableCell >{item.description}</TableCell>
                        <TableCell >{item.itemsTotal}</TableCell>
                        <TableCell>{item.commission}</TableCell>

                      </TableRow>
                    ))}
                    <TableRow

                    >

                      <TableCell ></TableCell>
                      <TableCell ></TableCell>
                      <TableCell ></TableCell>
                      <TableCell ></TableCell>

                      <TableCell component="th" sx={{ backgroundColor: '#dbdbdb' }} >Total Comisión</TableCell>
                      <TableCell sx={{ backgroundColor: '#dbdbdb' }} > $ {row.total}</TableCell>

                    </TableRow>
                  </TableBody>
                </Table>

              </TableContainer>

            </AccordionDetails>
          </Accordion>
        ))}


      </div>
    </Container >

  );
}