"use client";
import React, { useEffect, useState, useRef } from "react";
import { fetchBreeds } from "../services/apis";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Box,
  Divider,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Toggles from "../components/toggles";

export default function Breeds() {
  const [breeds, setBreeds] = useState([]);
  const [activeId, setActiveId] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchedPet = async () => {
      try {
        const data = await fetchBreeds();
        setBreeds(data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };
    fetchedPet();
  }, []);

  const handleSelect = (id) => {
    setActiveId(id);
    setMobileMenuOpen(false);
    const offset = isMobile ? 80 : 100;
    if (id === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = sectionRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = isMobile ? 100 : 150;
      let current = null;
      for (const breed of breeds) {
        const el = sectionRefs.current[breed.id];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom >= offset) {
          current = breed.id;
          break;
        }
      }
      if (current) setActiveId(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [breeds, isMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", pb: 6 }}>
      
      {/* Mobile Header */}
      {isMobile && (
        <Box sx={{ 
          bgcolor: "#009788", 
          py: 2, 
          px: 2,
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: 2
        }}>
          <Typography variant="h6" fontWeight="bold" color="#fff">All Breeds</Typography>
          <IconButton onClick={() => setMobileMenuOpen(true)} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="top" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee" }}>
          <Typography fontWeight="bold">Browse Breeds</Typography>
          <IconButton size="small" onClick={() => setMobileMenuOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <Box sx={{ p: 2, overflowX: "auto", display: "flex", gap: 1, pb: 3 }}>
          <Toggles breeds={breeds} selectedId={activeId} onChange={handleSelect} variant="mobile" />
        </Box>
      </Drawer>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Box sx={{ display: { xs: "block", md: "flex" }, gap: { xs: 3, md: 4 } }}>
          
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Box sx={{ 
              width: 200, 
              position: "sticky", 
              top: 100, 
              height: "fit-content",
              alignSelf: "flex-start"
            }}>
              <Toggles breeds={breeds} selectedId={activeId} onChange={handleSelect} />
            </Box>
          )}

          {/* Main Content - CENTERED */}
          <Box sx={{ flex: 1, width: "100%" }}>
            {!isMobile && (
              <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 5, color: "#333" }}>
                All Breeds
              </Typography>
            )}

            {/* ✅ CENTERED CARDS GRID */}
            <Box sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", // ✅ Centers cards horizontally
              gap: { xs: 3, md: 4 }
            }}>
              {breeds.map((breed) => (
                <Card
                  key={breed.id}
                  ref={(el) => (sectionRefs.current[breed.id] = el)}
                  id={`breed-${breed.id}`}
                  sx={{
                    // ✅ Perfect centering for all screens:
                    width: { xs: "100%", sm: "95%", md: "100%" },
                    maxWidth: 800,
                    borderRadius: 4,
                    boxShadow: activeId === breed.id ? 12 : 3,
                    border: activeId === breed.id ? "3px solid #009788" : "1px solid #e0e0e0",
                    transition: "all 0.25s ease",
                    "&:hover": { 
                      transform: isMobile ? "none" : "translateY(-3px)",
                      boxShadow: 8 
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height={{ xs: 200, sm: 250, md: 300 }}
                    image={breed.image?.url || "https://via.placeholder.com/800x400?text=No+Image"}
                    alt={breed.name}
                    sx={{ objectFit: "cover" }}
                  />

                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "1.3rem", sm: "1.6rem", md: "1.8rem" } }}>
                      {breed.name}
                    </Typography>

                    {/* Chips - Scrollable on mobile */}
                    <Box sx={{ display: "flex", gap: 1, mb: 2, overflowX: "auto", pb: 0.5, "&::-webkit-scrollbar": { display: "none" } }}>
                      <Chip label={`🌍 ${breed.origin}`} size="small" sx={{ flexShrink: 0, fontWeight: 500 }} />
                      <Chip label={`🐕 ${breed.breed_group}`} size="small" sx={{ flexShrink: 0, fontWeight: 500 }} />
                      <Chip label={`⏱ ${breed.life_span}`} size="small" sx={{ flexShrink: 0, fontWeight: 500 }} />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Stats */}
                    <Grid container spacing={2}>
                      {[
                        { label: "Weight", value: breed.weight?.metric },
                        { label: "Height", value: breed.height?.metric },
                        { label: "Country", value: breed.country_code },
                        { label: "Bred For", value: breed.bred_for },
                      ].map((stat, i) => (
                        <Grid item xs={6} sm={3} key={i}>
                          <Typography variant="caption" color="text.secondary" fontWeight="600">{stat.label}</Typography>
                          <Typography fontWeight="500" fontSize="0.9rem">{stat.value || "N/A"}</Typography>
                        </Grid>
                      ))}
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    {/* Description */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>Description</Typography>
                      <Typography color="text.secondary" lineHeight={1.6} fontSize={{ xs: "0.9rem", sm: "1rem" }}>
                        {breed.description || "No description available."}
                      </Typography>
                    </Box>

                    {/* Temperament */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>Temperament</Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {breed.temperament?.split(",").map((temp, index) => (
                          <Chip key={index} label={temp.trim()} size="small" variant="outlined" sx={{ borderRadius: 2 }} />
                        ))}
                      </Box>
                    </Box>

                    {/* History */}
                    {breed.history && (
                      <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>History</Typography>
                        <Typography color="text.secondary" lineHeight={1.6} fontSize={{ xs: "0.9rem", sm: "1rem" }}>
                          {breed.history}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}