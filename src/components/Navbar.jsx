import * as React from 'react';
import { AppBar, Box, Button, Container, IconButton, InputBase, Menu, MenuItem, Toolbar } from "@mui/material";
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
            Servicios
          </Button>
          <Button href='/formulario' sx={{color:'white', textTransform: 'none'}}>
            Formulario
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