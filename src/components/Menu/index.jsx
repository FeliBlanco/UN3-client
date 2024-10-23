import { AppBar, Box, Button, IconButton, MenuItem, Toolbar, Typography, Menu as MenuMUI } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from "react";


export default function Menu() {

    const { user, isAuthenticated, logout } = useAuth0();

    const [anchorEl, setAnchorEl] = useState(null);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar component="nav" sx={{position:'relative'}}>
            <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                <Box>
                    <Typography>Programacion III</Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {isAuthenticated ?
                    <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                        <Typography>{user.name}</Typography>
                      <AccountCircle />
                    </IconButton>
                    <MenuMUI
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      sx={{marginTop:'40px'}}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                    </MenuMUI>
                  </div>
                    :
                    <Button sx={{ color: '#fff' }} onClick={() => window.location.href="/login"}>Iniciar sesión</Button>
                }
                </Box>
            </Toolbar>
        </AppBar>
    )
}