import React, { useEffect,useState } from 'react'
import { fetchBreeds} from '../services/apis'

import { 
  Typography, 
  Button, 
  Container, 
  Box, 
  Stack ,
  Grid
} from '@mui/material';

import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import HeroImage from '../assets/hero1-bg.jpg'
import { useNavigate } from 'react-router-dom';

export default function Home() {
const colorTheme= "#ff6a00"
const [petData, setPetData]= useState([])
const navigate= useNavigate()

  

useEffect(() => {
    const fetchedPet = async () => {
      try {
        const data = await fetchBreeds();
                // console.log(data)

        const itemsToDisplay = data.slice(86, 90);
        setPetData(itemsToDisplay);
        console.log(itemsToDisplay)
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };
    fetchedPet();
  }, [])


  return (

<>
      {/* SECTION 1: HERO SECTION */}
<Box
  sx={{
    bgcolor: "#009788",
    py: { xs: 6, md: 10 },
    px: 2,
    backgroundImage: { xs: "none", md: `url(${HeroImage})` },
    backgroundSize: "contain",
    backgroundPosition: "right center",
    backgroundRepeat: "no-repeat",
    minHeight: { xs: "auto", md: 400 },
    display: "flex",
    alignItems: "center",
    textAlign: { xs: "center", md: "left" },
  }}
>
  <Container maxWidth="md">
    <Grid container alignItems="center">
      
      {/* TEXT SECTION */}
      <Grid item xs={12} md={6}>
        <Typography
          variant="h2"
          fontWeight="800"
          gutterBottom
          sx={{
            color: "#fff",
            lineHeight: 1.2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
          }}
        >
          Elevate Your Pet Experience
        </Typography>

        <Typography
          variant="h5"
          paragraph
          sx={{
            color: "rgba(255,255,255,0.9)",
            mb: 4,
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
          }}
        >
          Wet Nose Warm Heart...
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent={{ xs: "center", md: "flex-start" }}
          alignItems="center"
        >
          <Button
            variant="contained"
            size="large"
            fullWidth={{ xs: true, sm: false }}
            sx={{
              px: 4,
              width: { xs: "100%", sm: "auto" },
              backgroundColor: colorTheme,
              "&:hover": {
                backgroundColor: colorTheme,
                filter: "brightness(0.9)",
              },
            }}
            onClick={() => navigate("/allPets")}
          >
            Adoption
          </Button>

          <Button
            variant="outlined"
            size="large"
            fullWidth={{ xs: true, sm: false }}
            sx={{
              px: 4,
              width: { xs: "100%", sm: "auto" },
              color: "#fff",
              borderColor: "#fff",
              "&:hover": {
                borderColor: colorTheme,
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
            onClick={() => navigate("/contactus")}
          >
            Donation
          </Button>
        </Stack>
      </Grid>

      {/* IMAGE SIDE (hidden on mobile) */}
      <Grid item xs={0} md={6} />
    </Grid>
  </Container>
</Box>

      {/* SECTION 2: CARDS GRID */}
<Container maxWidth="lg" sx={{ py: 8 }}>
  <Container sx={{ display: 'flex', justifyContent: "space-between", px: 0 }}>
    <Typography 
      variant="h4" 
      fontWeight="bold" 
      gutterBottom 
      sx={{ mb: 4, color: '#333' }}
    >
      Our Pets
    </Typography>

    <Button variant="contained" sx={{ backgroundColor: colorTheme, height: 35, width: 150 }} href="/allPets">
      View All
    </Button>
  </Container>
  
<Grid
  container
  spacing={4}
  justifyContent="center"   // ✅ center items horizontally
  sx={{ px: { xs: 2, sm: 3, md: 6 } }} // responsive padding
>
  {petData?.map((item) => (
    <Grid
      item
      key={item.id}
      xs={12}
      sm={6}
      md={4}
      lg={3} // ✅ better layout for large screens
      sx={{ display: "flex", justifyContent: "center" }} // center card inside grid
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 300, // ✅ prevents stretching
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={
            item.image?.url ||
            "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop"
          }
          alt={item.name}
          sx={{ objectFit: "cover" }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="overline" color="textSecondary" fontWeight="bold">
            {item.breed_group || "Hound"}
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ textTransform: "capitalize" }}
          >
            {item.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, fontStyle: "italic" }}
          >
            {item.temperament?.split(",").slice(0, 3).join(", ")}...
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Life Span: <strong>{item.life_span} years</strong>
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            px: 2,
            pb: 2,
            justifyContent: "space-between",
          }}
        >
          <Button
            size="small"
            sx={{ color: colorTheme, fontWeight: "bold" }}
            href={`/details/${item.id}`}
          >
            Details
          </Button>

          <Typography
            variant="caption"
            sx={{
              bgcolor: "#f0f0f0",
              px: 1,
              borderRadius: 1,
            }}
          >
            {item.origin || "Global"}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>
</Container>
    </>

  );

}
