"use client"
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logo from '../assets/pet-paw-logo-bg-.png'
import AppDrawer from './drawer'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled("div")(({ theme, lang }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  left: lang === "en" ? 0 : "auto",
  right: lang === "ar" ? 0 : "auto",
}));

const StyledInputBase = styled(InputBase)(({ theme, lang }) => ({
  color: "inherit",
  width: "100%",
  direction: lang === "ar" ? "rtl" : "ltr",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    // 👇 dynamic padding so text doesn't overlap icon
    paddingLeft: lang === "en" ? `calc(1em + ${theme.spacing(4)})` : theme.spacing(1),
    paddingRight: lang === "ar" ? `calc(1em + ${theme.spacing(4)})` : theme.spacing(1),

    textAlign: lang === "ar" ? "right" : "left",
  },
}));
export default function Navbar() {
const [user, setUser]= useState(null)
  const navigate = useNavigate()
    const navigateProfile = ()=>{
    navigate("/profile")
  }
const { lang, t } = useLanguage();

   useEffect(()=>{
    const storedUser= localStorage.getItem("user")
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  },[])

  const logOut= ()=>{
    localStorage.removeItem("user")
    setUser(null)
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (state) => {
    setOpen(state);
  };


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
     
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user?(
        <>
      <MenuItem >{user.name}</MenuItem>
      <MenuItem onClick={logOut}>Logout</MenuItem>
        </>
        ):(
       <>
     <MenuItem onClick={navigateProfile} >SignUp</MenuItem>
       </> )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );



  return (
<Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor:"#006f68"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} width={50} height={50} alt='logo' />
      
         <Link to="/" style={{ textDecoration: 'none' , color:"#000" }}sx={{textDecoration:"none", display:"flex", flexDirection:"row"}}>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            PetHoven
          </Typography>
          </Link>
                {/* SEARCH FIELD */}
          <Search>
            <SearchIconWrapper lang={lang}>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              lang={lang}
              placeholder={t("search")}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="#ee8325" sx={{fontColor:"#ee8325"}}>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="#ee8325">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
 
          {/* DRAWER */}

      <AppDrawer
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <p>Menu Content</p>
        </Box>
      </AppDrawer>
    </Box>
  );
}
