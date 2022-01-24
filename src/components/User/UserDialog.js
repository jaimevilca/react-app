import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux";
import DialogTitle from '@mui/material/DialogTitle';
import { USERS } from "../../utils/constants";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { postAuth, putAuth } from "../../utils/axiosHandler";

function UserDialog(props) {
  const {
    isOpenDialog,
    handleClose,
    user,
    updateList

  } = props;

  const [username, setUsername] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [role, setRole] = React.useState("");
  const [status, setStatus] = React.useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const onSuccessSaveData = (data) => {
    const newUser = {
      ...user, id: data.data.id, username, pwd, role, status
    };
    updateList(newUser);
    handleClose();
  };

  useEffect(() => {
    setRole(user.role);
    setStatus(user.status);
    setUsername(user.username);
    setPwd("");

  }, [user]);

  const save = () => {
    const data = {
      ...user, username, pwd, role, status
    };
    if (!user.id) {

      postAuth(USERS, data, token, onSuccessSaveData, null, dispatch);

    } else {
      putAuth(USERS + '/' + user.id, data, token, onSuccessSaveData, null, dispatch);
    }

  };

  return (
    <div>

      <Dialog open={isOpenDialog} onClose={handleClose}>
        <DialogTitle>Registrar usuario</DialogTitle>
        <DialogContent>

          <TextField

            margin="dense"
            id={user.id}
            label="ID usuario"
            type="string"
            value={user.id}
            variant="standard"
            disabled
          />

          <TextField
            autoFocus
            margin="dense"
            label="Nombre de usuario"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            label="Contraseña"
            type="password"
            value={pwd}
            onChange={(event) => setPwd(event.target.value)}
            variant="standard"
          />
          <FormControl variant="filled" sx={{ m: 2, minWidth: 200 }}>
            <InputLabel id="label-rol">Rol del usuario</InputLabel>

            <Select
              labelId="label-rol"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <MenuItem value={"ADMIN"}>Administrador</MenuItem>
              <MenuItem value={"STYLIST"}>Estilista</MenuItem>

            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ m: 2, minWidth: 200 }}>
            <InputLabel id="label-status">Estado</InputLabel>

            <Select
              labelId="label-status"
              id="demo-simple-select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}

            >
              <MenuItem value={"ACTIVE"}>Activo</MenuItem>
              <MenuItem value={"INACTIVE"}>Inactivo</MenuItem>

            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={save}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

UserDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,

  user: PropTypes.object.isRequired,
  updateList: PropTypes.func.isRequired,


};



export default UserDialog;
