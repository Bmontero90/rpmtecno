import * as React from 'react';
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
;




export default function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
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
          <Button href='/servicios' sx={{color:'white', textTransform: 'none'}} >
            Órdenes
          </Button>
          <Button href='/clientes' sx={{color:'white', textTransform: 'none'}}>
            Clientes
          </Button>
          <Button href='/listaGarantias' sx={{color:'white', textTransform: 'none'}}>
            Garantias
          </Button>
          <Button href='/login' sx={{color:'white', textTransform: 'none'}}>
            Login
          </Button>
          <Button
            sx={{
              bgcolor: "black",
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'lowercase',
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
            onClick={handleClick}>
            <AccountCircleOutlinedIcon />
            Ingresar
          </Button>
        </Toolbar>
        </Container>
      </AppBar>
      </Container>
    </>
  )
}