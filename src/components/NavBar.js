import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/auth";
import { useNavigate } from "react-router-dom";


function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let navigate = useNavigate();


  const pages = [
    { page: "Dashboard", onClick: () => navigate("dashboard") },
    { page: "Orden", onClick: () => navigate("order") },
    { page: "User", onClick: () => navigate("user") },
    { page: "Item", onClick: () => navigate("item") },
    { page: "Buscar", onClick: () => navigate("search") },
    { page: "Reporte", onClick: () => navigate("commission-report") },
  ];

  const dispatch = useDispatch();

  const { username } = useSelector((state) => state.auth);

  const settings = [
    {
      text: "Logout",
      onClick: () => {
        handleCloseNavMenu();
        dispatch(logoutUser());
      },
    },
  ];

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, alignItems: 'center' }}
          >
            <Avatar alt={username} src="/test.jpg" sx={{ marginRight: 1 }} />

            <Typography variant="button" textAlign="center">Londoño</Typography>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ page, onClick }, index) => (
                <MenuItem key={index.toString()} onClick={() => { handleCloseNavMenu(); onClick(); }}>

                  <Typography textAlign="center">{page}</Typography>

                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, flexDirection: 'row-reverse' }}>
            {pages.map(({ page, onClick }, index) => (

              <Button
                key={index.toString()}
                variant="outlined"
                onClick={() => { handleCloseNavMenu(); onClick(); }}
                sx={{ textDecoration: 'none', color: "white", display: "block" }}
              >

                {page}

              </Button>

            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username} src="/static/images/ag" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ text, onClick }, index) => (
                <MenuItem key={index.toString()} onClick={onClick}>
                  <Typography textAlign="center">{text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
