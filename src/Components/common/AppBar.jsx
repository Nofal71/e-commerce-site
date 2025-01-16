import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { LoaderProvider } from '../../Firebase/fetchData';
import { dotWave } from 'ldrs'
import { currentUserProvider } from '../../Context/CurrentUser';
import { currentUser } from '../../redux/Selectors/UserSelector/CustomerSiteReducer';

dotWave.register()

const drawerWidth = 240;

function AppBarComponent(props) {
  const navigate = useNavigate();
  const { currentUserEmail, isAdmin, logout } = useContext(currentUserProvider)
  const user = useSelector((state) => currentUserEmail && currentUser(state))
  const name = user?.userDetails?.name
  const { userLoader } = useContext(LoaderProvider)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        POS System
      </Typography>
      <Divider />
      <List>
        {isAdmin && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin" sx={{ textAlign: 'center' }}>
              <ListItemText primary="Admin" />
            </ListItemButton>
          </ListItem>
        )}
        {currentUserEmail ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/cart" sx={{ textAlign: 'center' }}>
                <ListItemText primary="Cart" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {
                toast.success('Logout Success');
                localStorage.removeItem('email')
                navigate('/login');
              }} sx={{ textAlign: 'center' }}>
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                  <Typography variant='h6'>Welcome <strong>{userLoader ?
                    <l-dot-wave
                      size="47"
                      speed="1"
                      color="white"
                    ></l-dot-wave> :
                    name}</strong></Typography>
                  <LogoutIcon />
                </Stack>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              logout()
              navigate('/login');
            }} sx={{ textAlign: 'center' }}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', marginBottom: '74px' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#424242' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 0, marginRight: '20px', textDecoration: 'none', color: 'white', display: { xs: 'none', sm: 'block' } }}
          >
            POS System
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, alignItems: 'center' }}>
            {isAdmin && (
              <Typography variant="h6" component={Link} to="/admin" sx={{ marginRight: '15px', textDecoration: 'none', color: 'white' }}>
                Admin
              </Typography>
            )}
            {currentUserEmail ? (
              <>
                <Typography variant="h6" component={Link} to="/cart" sx={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}>
                  Cart
                </Typography>
                <Button color="inherit">
                  <Stack spacing={2} direction={'row'} alignItems={'center'}>
                    <Typography variant='h6' onClick={() => navigate('/userDetails')}>Welcome <strong>{userLoader ?
                      <l-dot-wave
                        size="47"
                        speed="1"
                        color="white"
                      ></l-dot-wave> :
                      name}</strong></Typography>
                    <LogoutIcon onClick={() => {
                      logout()
                      toast.success('Logout Success');
                      navigate('/login');
                    }} />
                  </Stack>
                </Button>
              </>
            ) : (
              <Button sx={{ marginLeft: 'auto' }} onClick={() => {
                navigate('/login');
              }} color="inherit">Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

AppBarComponent.propTypes = {
  window: PropTypes.func,
};

export default AppBarComponent;
