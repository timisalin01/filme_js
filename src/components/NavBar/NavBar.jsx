import React, { useState, useEffect } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, userSelector } from '../../features/auth'; // Import Redux actions and selectors
import { Sidebar, Search } from '..'; // Additional components
import { fetchToken, createSessionId, moviesApi } from '../../utils'; // Utility functions and API calls
import useStyles from './styles'; // Custom styles for the component

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector); // Fetch user state from Redux
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile navigation
  const classes = useStyles(); // Custom styles
  const isMobile = useMediaQuery('(max-width:600px)'); // Media query to check screen size
  const theme = useTheme(); // Get the current theme (light/dark mode)
  const dispatch = useDispatch(); // Redux dispatch function

  console.log(user);

  // Get the token and sessionId from localStorage
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  // Effect to log in the user when the token is available
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        try {
          if (sessionIdFromLocalStorage) {
            // Fetch user data if sessionId is available
            const { data: userData } = await moviesApi.get(
              `/account?session_id=${sessionIdFromLocalStorage}`
            );
            if (userData && userData.id) {
              // Verifică dacă userData conține datele necesare
              dispatch(setUser(userData)); // Dispatch action to set the user in Redux
            } else {
              console.error('Invalid user data:', userData);
            }
          } else {
            // Create new sessionId if not available
            const sessionId = await createSessionId();

            const { data: userData } = await moviesApi.get(
              `/account?session_id=${sessionId}`
            );

            if (userData && userData.id) {
              // Verifică dacă userData conține datele necesare
              dispatch(setUser(userData)); // Dispatch action to set the user in Redux
            } else {
              console.error('Invalid user data:', userData);
            }
          }
        } catch (error) {
          console.error('Error during login:', error);
          if (error.response && error.response.status === 401) {
            // Token might be expired or invalid, regenerate token
            await fetchToken();
          }
        }
      }
    };

    logInUser();
  }, [token, dispatch, sessionIdFromLocalStorage]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/profile/id"
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://avatar.iran.liara.run/public/1"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
