import { Group, Menu as MenuIcon } from '@mui/icons-material';
import {
  MenuItem,
  Container,
  AppBar,
  Box,
  Toolbar,
  Typography,
  CircularProgress,
  IconButton,
  Menu,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { NavLink } from 'react-router';
import MenuItemLink from '../shared/components/MenuItemLink';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';
import { useAccount } from '../../lib/hooks/useAccount';
import UserMenu from './UserMenu';
import { useState } from 'react';

function NavBar() {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage:
            'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: 'flex', gap: 2 }}
              >
                <Group fontSize="large" />
                <Typography
                  sx={{ position: 'relative' }}
                  variant="h4"
                  fontWeight="bold"
                >
                  Reactivities
                </Typography>
                <Observer>
                  {() =>
                    uiStore.isLoading ? (
                      <CircularProgress
                        size={20}
                        thickness={7}
                        sx={{
                          color: 'white',
                          position: 'absolute',
                          top: '30%',
                          left: '105%',
                        }}
                      />
                    ) : null
                  }
                </Observer>
              </MenuItem>
            </Box>
            {isMobile ? (
              <Box>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <MenuItemLink to="/activities">Activities</MenuItemLink>
                  </MenuItem>
                  {currentUser ? (
                    <MenuItem onClick={handleClose}>
                      <UserMenu />
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem onClick={handleClose}>
                        <MenuItemLink to="/login">Login</MenuItemLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <MenuItemLink to="/register">Register</MenuItemLink>
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex' }}>
                  <MenuItemLink to="/activities">Activities</MenuItemLink>
                </Box>
                <Box display="flex" alignItems="center">
                  {currentUser ? (
                    <UserMenu />
                  ) : (
                    <>
                      <MenuItemLink to="/login">Login</MenuItemLink>
                      <MenuItemLink to="/register">Register</MenuItemLink>
                    </>
                  )}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default NavBar;
