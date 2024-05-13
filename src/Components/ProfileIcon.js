import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ViewListIcon from '@mui/icons-material/ViewList';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { doLogout } from '../Auth';
import CartIcon from './CartIcon';
import { useDispatch } from 'react-redux';
import { clearCart } from '../Store/cartSlice';

export default function AccountMenu(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/user/profile")
  };
  
  const handleLogoutClick = () =>{
    dispatch(clearCart());
    doLogout();
    navigate("/login");
  }
  const handleOrdersClick = () =>{
    navigate("/user/orders");
  }
  const handleClose = () =>{
    setAnchorEl(null);
  }
  
  return (
    <React.Fragment>
      <div className="container" style={{display:"flex"}}>
      <div style={{marginTop:"5px"}}><CartIcon/></div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 25, height: 25 }}></Avatar>
            <Typography fontFamily={'"Roboto",sans-serif'} fontWeight={'bold'} fontSize={14} ml={0.5} justifySelf={'right'}>{props.name}</Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Avatar /> Profile
        </MenuItem>
        
        <Divider />
        <MenuItem onClick={handleOrdersClick}>
          <ListItemIcon>
            <ViewListIcon fontSize="small" />
          </ListItemIcon>
          Orders
        </MenuItem>
       
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </div>
    </React.Fragment>
  );
}
