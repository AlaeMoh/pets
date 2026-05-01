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
} from "@mui/material";

import Toggles from "../components/toggles";

export default function Breeds() {
  const [breeds, setBreeds] = useState([]);
  const [activeId, setActiveId] = useState("all");
  const sectionRefs = useRef({});

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

  ////////

  const handleSelect = (id) => {
    setActiveId(id);

    if (id === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = sectionRefs.current[id];
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - 100, 
      behavior: "smooth",
    });
  };

/////

  useEffect(() => {
    const handleScroll = () => {
      let current = null;

      for (const breed of breeds) {
        const el = sectionRefs.current[breed.id];
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
          current = breed.id;
          break;
        }
      }

      if (current) setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [breeds]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        px: 3,
        alignItems: "flex-start",
        gap: 20,
        mt: 4,
      }}
    >
      <Box
        sx={{
          width: 200,
          top: 120,
          height: "fit-content",
        }}
      >
        <Toggles
          breeds={breeds}
          selectedId={activeId}
          onChange={handleSelect}
        />
      </Box>

      {/* RIGHT CONTENT */}
      <Box sx={{ flex: 1, maxWidth: 900 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 4, textAlign: "center" }}
        >
          All Breeds
        </Typography>

        {breeds.map((breed) => (
          <Card
            key={breed.id}
            ref={(el) => (sectionRefs.current[breed.id] = el)}
            sx={{
              maxWidth: 900,
              margin: "auto",
              mt: 4,
              borderRadius: 4,
              boxShadow: activeId === breed.id ? 10 : 3,
              border:
                activeId === breed.id ? "2px solid #009788" : "none",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="350"
              image={breed.image?.url}
              alt={breed.name}
            />

            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {breed.name}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Chip label={`Origin: ${breed.origin}`} sx={{ mr: 1 }} />
                <Chip label={`Group: ${breed.breed_group}`} sx={{ mr: 1 }} />
                <Chip label={`Life: ${breed.life_span} years`} />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Weight</Typography>
                  <Typography>{breed.weight.metric} kg</Typography>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Height</Typography>
                  <Typography>{breed.height.metric} cm</Typography>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Country Code</Typography>
                  <Typography>{breed.country_code}</Typography>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Bred For</Typography>
                  <Typography>
                    {breed.bred_for || "Not specified"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">Description</Typography>
              <Typography color="text.secondary" paragraph>
                {breed.description}
              </Typography>

              <Typography variant="h6">Temperament</Typography>
              <Box>
                {breed.temperament?.split(",").map((temp, index) => (
                  <Chip
                    key={index}
                    label={temp.trim()}
                    sx={{ mr: 1, mb: 1 }}
                    variant="outlined"
                  />
                ))}
              </Box>

              <Typography variant="h6" sx={{ mt: 2 }}>
                History
              </Typography>
              <Typography color="text.secondary">
                {breed.history}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}