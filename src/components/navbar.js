"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";

import Logo from "../assets/pet-paw-logo-bg-.png";
import AppDrawer from "./drawer";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { searchBreeds} from "../services/apis";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(3),
  width: "300px",
}));

const SearchIconWrapper = styled("div")(({ theme, lang }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  height: "100%",
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
  left: lang === "en" ? 0 : "auto",
  right: lang === "ar" ? 0 : "auto",
}));

const StyledInputBase = styled(InputBase)(({ theme, lang }) => ({
  color: "inherit",
  width: "100%",
  direction: lang === "ar" ? "rtl" : "ltr",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    paddingLeft:
      lang === "en" ? `calc(1em + ${theme.spacing(4)})` : theme.spacing(1),
    paddingRight:
      lang === "ar" ? `calc(1em + ${theme.spacing(4)})` : theme.spacing(1),
  },
}));

export default function Navbar() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // fetch pets
useEffect(() => {
  if (!debouncedSearch) {
    setPets([]);
    return;
  }

  const fetchPets = async () => {
    try {
      const data = await searchBreeds(debouncedSearch);
      setPets(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchPets();
}, [debouncedSearch]);

  const handleSelectPet = (petId) => {
    setSearchTerm("");
    setPets([]);
    navigate(`/petdetail/${petId}`);
  };

  return (
    <Box sx={{ flexGrow: 1, position: "relative" }}>
      <AppBar position="static" sx={{ backgroundColor: "#006f68" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>

          <img src={Logo} width={50} height={50} alt="logo" />

          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            <Typography variant="h6">PetHoven</Typography>
          </Link>

          {/* SEARCH */}
            <Search>
              <SearchIconWrapper lang={lang}>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                lang={lang}
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {searchTerm && (
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearchTerm("");
                    setPets([]);
                  }}
                  sx={{
                    position: "absolute",
                    right: lang === "en" ? 5 : "auto",
                    left: lang === "ar" ? 5 : "auto",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}

              {/* ✅ DROPDOWN HERE */}
              {pets.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%", 
                    left: 0,
                    width: "100%",
                    bgcolor: "white",
                    color: "black",
                    borderRadius: 2,
                    boxShadow: 3,
                    zIndex: 999,
                    maxHeight: 250,
                    overflowY: "auto",
                    mt: 1,
                  }}
                >
                  {pets.map((pet) => (
                    <Box
                      key={pet.id}
                      onClick={() => handleSelectPet(pet.id)}
                      sx={{
                        p: 1,
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <strong>{pet.name}</strong>
                      <div style={{ fontSize: 12 }}>
                        {pet.temperament}
                      </div>
                    </Box>
                  ))}
                </Box>
              )}
            </Search>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <AppDrawer open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}