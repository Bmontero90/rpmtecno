import * as React from 'react';
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { useAuth } from './AuthContext';




export default function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated, login, logout } = useAuth();
  

  const handleButtonClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
    
  };
  console.log("authenticated:", isAuthenticated);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <Container sx={{mb:10}}>
      <AppBar position="fixed" sx={{bgcolor:'black'}}>
      <Container>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img className="logo" href='/' src="./logo.png"></img>
          </Box>
          {isAuthenticated && (
                <>
                  <Button href='/servicios' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
              <SettingsOutlinedIcon />
                    Órdenes
                  </Button>
                  <Button href='/clientes' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
              <ContactPhoneOutlinedIcon />
                    Clientes
                  </Button>
                  <Button href='/listaGarantias' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
                  <SupportAgentOutlinedIcon />
                    Garantias
                  </Button>
                  <Button href='/empleados' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
                  <SupervisorAccountOutlinedIcon />
                    Empleados
                  </Button>
                  <Button href='/tipoServicios' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
                  <ManageAccountsOutlinedIcon />
                    Servicios
                  </Button>
                  <Button href='/login'
            sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleButtonClick}>
            <AccountCircleOutlinedIcon />
             Cerrar Sesión
          </Button>
                </>
              )}
          
        </Toolbar>
        </Container>
      </AppBar>
      </Container>
    </>
  )
}