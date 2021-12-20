import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startLoginEmailPassword } from "../actions/auth";
import { Paper } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;
  const [emailHelperTex, setEmailHelperTex] = useState("");
  const [passHelperTex, setPassHelperTex] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const handleLogin = () => {
    if (!email) {
      setEmailHelperTex("Ingrese usuario");
    }

    if (!password) {
      setPassHelperTex("Ingrese contraseña");
    }

    if (email && password) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 6,
          }}
        >
           
            
          
          
          

          <Avatar alt="" src="/test.jpg"  />
          <Typography color="secondary" variant="h5" textAlign="center" >Londoño</Typography>
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={handleInputChange}
              label="Nombre de usuario"
              name="email"
              error={emailHelperTex && !email}
              helperText={emailHelperTex && !email ? emailHelperTex : ""}
              variant="standard"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={handleInputChange}
              id="password"
              variant="standard"
              error={passHelperTex && !password}
              helperText={passHelperTex && !password ? passHelperTex : ""}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Paper>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
