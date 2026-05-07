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
  Paper,
  Dialog,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Logo from "../assets/pet-paw-logo-bg-.png";
import AppDrawer from "./drawer";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { searchBreeds } from "../services/apis";

/* ================== STYLES ================== */
const DesktopSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  maxWidth: 300,
  marginLeft: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
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
    padding: theme.spacing(1, 1),
    paddingLeft:
      lang === "en" ? `calc(1em + ${theme.spacing(4)})` : theme.spacing(1),
    paddingRight:
      lang === "ar" ? `calc(1em + ${theme.spacing(4)})` : theme.spacing(1),
  },
}));

/* ================== COMPONENT ================== */
export default function Navbar() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch search results
  useEffect(() => {
    if (!debouncedSearch) {
      setPets([]);
      return;
    }
    const fetchPets = async () => {
      try {
        const data = await searchBreeds(debouncedSearch);
        setPets(data || []);
      } catch (err) {
        console.error("Search error:", err);
        setPets([]);
      }
    };
    fetchPets();
  }, [debouncedSearch]);

  // Auto-focus input when mobile search opens
  useEffect(() => {
    if (mobileSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [mobileSearchOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMobileSearchOpen(false);
        setSearchTerm("");
        setPets([]);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock body scroll when mobile search is open
  useEffect(() => {
    document.body.style.overflow = mobileSearchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSearchOpen]);

  const handleSelectPet = (petId) => {
    setSearchTerm("");
    setPets([]);
    setMobileSearchOpen(false);
    // Small delay ensures UI updates before navigation
    setTimeout(() => navigate(`/petdetail/${petId}`), 50);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setPets([]);
    searchInputRef.current?.focus();
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#006f68", boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
          
          {/* LEFT: Menu + Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" onClick={() => setOpen(true)} sx={{ p: 1.5 }}>
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <img src={Logo} width={36} height={36} alt="logo" style={{ borderRadius: 6 }} />
            </Link>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
                ml: 1,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              PetHoven
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1, maxWidth: 400, mx: 2 }}>
            <DesktopSearch>
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
                  onClick={handleClearSearch}
                  sx={{
                    position: "absolute",
                    right: lang === "en" ? 8 : "auto",
                    left: lang === "ar" ? 8 : "auto",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,0.9)",
                    p: 0.5,
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
              {/* Desktop Dropdown Results */}
              {pets.length > 0 && (
                <Paper
                  elevation={6}
                  sx={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    right: 0,
                    bgcolor: "white",
                    color: "black",
                    borderRadius: 2,
                    boxShadow: 4,
                    zIndex: 1100,
                    maxHeight: 300,
                    overflowY: "auto",
                  }}
                >
                  {pets.map((pet) => (
                    <Box
                      key={pet.id}
                      onClick={() => handleSelectPet(pet.id)}
                      sx={{
                        px: 2,
                        py: 1.5,
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                        "&:last-child": { borderBottom: "none" },
                      }}
                    >
                      <Typography variant="body1" fontWeight={600} noWrap>
                        {pet.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {pet.temperament || "Breed"}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              )}
            </DesktopSearch>
          </Box>

          {/* RIGHT: Icons + Mobile Search Trigger */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {/* Mobile Search Button */}
            <IconButton
              color="inherit"
              onClick={() => setMobileSearchOpen(true)}
              sx={{ display: { xs: "flex", sm: "none" }, p: 1.5 }}
              aria-label="open search"
            >
              <SearchIcon />
            </IconButton>

            {/* Desktop Icons */}
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <IconButton color="inherit" sx={{ p: 1.5 }}>
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" sx={{ p: 1.5 }}>
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" sx={{ p: 1.5 }}>
                <AccountCircle />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        fullScreen
        open={mobileSearchOpen}
        onClose={() => {
          setMobileSearchOpen(false);
          setSearchTerm("");
          setPets([]);
        }}
        TransitionComponent={Transition}
        sx={{ "& .MuiDialog-paper": { bgcolor: "#006f68" } }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 2, borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
          <IconButton
            color="inherit"
            onClick={() => {
              setMobileSearchOpen(false);
              setSearchTerm("");
              setPets([]);
            }}
            sx={{ mr: 1, color: "#fff" }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1, position: "relative" }}>
            <SearchIconWrapper lang={lang}>
              <SearchIcon sx={{ color: "#fff" }} />
            </SearchIconWrapper>
            <StyledInputBase
              inputRef={searchInputRef}
              lang={lang}
              placeholder={t("search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#fff !important",
                  "&::placeholder": { color: "rgba(255,255,255,0.7)" },
                },
              }}
            />
            {searchTerm && (
              <IconButton
                size="small"
                onClick={handleClearSearch}
                sx={{
                  position: "absolute",
                  right: lang === "en" ? 8 : "auto",
                  left: lang === "ar" ? 8 : "auto",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.9)",
                  p: 0.5,
                }}
              >
                <CloseIcon fontSize="small" sx={{ color: "#fff" }} />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Search Results */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {pets.length > 0 ? (
            <Paper
              elevation={0}
              sx={{
                bgcolor: "rgba(255,255,255,0.95)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {pets.map((pet) => (
                <Box
                  key={pet.id}
                  onClick={() => handleSelectPet(pet.id)}
                  sx={{
                    px: 3,
                    py: 2,
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    "&:hover": { backgroundColor: "#f0f7ff" },
                    "&:active": { backgroundColor: "#e0efff" },
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      overflow: "hidden",
                      bgcolor: "#f5f5f5",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {pet.image?.url ? (
                      <img
                        src={pet.image.url}
                        alt={pet.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        loading="lazy"
                      />
                    ) : (
                      <SearchIcon sx={{ color: "#ccc" }} />
                    )}
                  </Box>

                  {/* Pet Info */}
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body1" fontWeight={600} noWrap>
                      {pet.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {pet.temperament?.split(",").slice(0, 2).join(", ") || pet.breed_group || "Breed"}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
          ) : searchTerm ? (
            <Box sx={{ textAlign: "center", py: 8, color: "rgba(255,255,255,0.8)" }}>
              <SearchIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
              <Typography>No breeds found for "{searchTerm}"</Typography>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", py: 8, color: "rgba(255,255,255,0.6)" }}>
              <Typography variant="h6" sx={{ mb: 1 }}>🔍 Search Breeds</Typography>
              <Typography>Start typing to find your perfect pet companion</Typography>
            </Box>
          )}
        </Box>
      </Dialog>

      <AppDrawer open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}