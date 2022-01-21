import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { getAuth } from "../../utils/axiosHandler";
import { USERS } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import UserDialog from "./UserDialog";
import PropTypes from "prop-types";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function Detail(props) {
  const {
    updateCount
  } = props;
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = React.useState([]);
  const [openRevealDialog, setOpenRevealDialog] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [userIndex, setUserIndex] = React.useState(0);
  const dispatch = useDispatch();
  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  useEffect(() => {
    getAuth(USERS, token, ({ data }) => getUsers(data), null, dispatch);
  }, []);

  const getUsers = (data) => {
    setUsers(data);
    updateCount(data.length);

  };

  const handleClose = () => {
    setOpenRevealDialog(false);

  };
  const edit = (user, index) => {
    setOpenRevealDialog(true);
    setUser(user);
    setUserIndex(index);


  };

  const updateList = (user) => {
    let newState = [...users];
    if (userIndex >= 0) {
      newState[userIndex] = user;
    } else {
      newState.push(user);
    }
    setUsers(newState);
  };

  const add = () => {
    setOpenRevealDialog(true);
    setUser({ id: "", username: "", role: "", status: "ACTIVE" });
    setUserIndex(-1);

  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table dense sx={{}} aria-label="simple table" size="small">
          <TableHead sx={{ backgroundColor: '#dbdbdb' }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell >Nombre de usuario</TableCell>
              <TableCell >Rol</TableCell>
              <TableCell >Estado</TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <TableRow
                key={row.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell >{row.username}</TableCell>
                <TableCell >{row.role}</TableCell>
                <TableCell >{row.status}</TableCell>

                <TableCell >
                  <IconButton aria-label="delete" size="small" onClick={() => edit(row, index)} >
                    <EditIcon fontSize="inherit" />
                  </IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={add}>
          <AddIcon />
        </Fab>
      </TableContainer>

      <UserDialog
        handleClose={handleClose}
        isOpenDialog={openRevealDialog}
        user={user}
        updateList={updateList}


      />
    </>
  );


}

Detail.propTypes = {
  updateCount: PropTypes.func.isRequired,

};

export default Detail;
