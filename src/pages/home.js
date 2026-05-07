import React, { useEffect, useState } from 'react'
import { fetchBreeds } from '../services/apis'
import { 
  Typography, 
  Button, 
  Container, 
  Box, 
  Stack,
  Grid 
} from '@mui/material';
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import HeroImage from '../assets/hero1-bg.jpg'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const colorTheme = "#ff6a00"
  const [petData, setPetData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

useEffect(() => {
  const fetchedPet = async () => {
    try {
      setLoading(true);
      const data = await fetchBreeds();
      
      const withImages = data.filter(breed => 
        breed.image_url && !breed.image_url.includes('placeholder')
      );
      
      const itemsToDisplay = withImages.slice(0, 3);
      
      setPetData(itemsToDisplay);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
      setPetData([]);
    } finally {
      setLoading(false);
    }
  };
  fetchedPet();
}, [])
  return (
    <>
      {/* ================== HERO SECTION ================== */}
      <Box
        sx={{
          bgcolor: "#009788",
          py: { xs: 8, md: 12 },
          px: { xs: 2, sm: 3 },
          backgroundImage: { xs: "none", md: `url(${HeroImage})` },
          backgroundSize: { md: "contain" },
          backgroundPosition: { md: "right center" },
          backgroundRepeat: "no-repeat",
          minHeight: { xs: "auto", md: 420 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            
            {/* TEXT CONTENT - Centered on mobile */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography
                  variant="h2"
                  fontWeight="800"
                  gutterBottom
                  sx={{
                    color: "#fff",
                    lineHeight: 1.15,
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  Elevate Your Pet Experience
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: "rgba(255,255,255,0.95)",
                    mb: 4,
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                    maxWidth: { xs: "100%", md: "90%" },
                    mx: { xs: "auto", md: 0 }
                  }}
                >
                  Wet Nose Warm Heart...
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  alignItems="center"
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth={{ xs: true, sm: false }}
                    sx={{
                      px: 4,
                      py: 1.2,
                      backgroundColor: colorTheme,
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      "&:hover": {
                        backgroundColor: colorTheme,
                        filter: "brightness(0.92)",
                        transform: "translateY(-1px)"
                      },
                      transition: "all 0.2s"
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
                      py: 1.2,
                      color: "#fff",
                      borderColor: "#fff",
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      "&:hover": {
                        borderColor: colorTheme,
                        backgroundColor: "rgba(255,255,255,0.12)",
                        transform: "translateY(-1px)"
                      },
                      transition: "all 0.2s"
                    }}
                    onClick={() => navigate("/contactus")}
                  >
                    Donation
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={0} md={6} />
          </Grid>
        </Container>
      </Box>

      {/* ================== PETS GRID SECTION ================== */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, sm: 3 } }}>
        
        {/* Section Header */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: { xs: "center", sm: "center" },
          gap: { xs: 2, sm: 0 },
          mb: { xs: 5, md: 6 },
          textAlign: { xs: "center", sm: "left" }
        }}>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            sx={{ 
              color: '#333',
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }
            }}
          >
            Our Pets
          </Typography>

          <Button 
            variant="contained" 
            href="/allPets"
            sx={{ 
              backgroundColor: colorTheme,
              px: 3,
              py: 1,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              minWidth: { xs: "100%", sm: 140 },
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                backgroundColor: colorTheme,
                filter: "brightness(0.92)"
              }
            }}
          >
            View All
          </Button>
        </Box>
        
        {/* Loading State */}
        {loading ? (
          <Grid container spacing={3} justifyContent="center">
            {[...Array(3)].map((_, i) => (
              <Grid item xs={12} sm={6} md={3} key={i} sx={{ display: "flex", justifyContent: "center" }}>
                <Card sx={{ width: { xs: "100%", sm: "90%" }, maxWidth: 340, height: 320, bgcolor: '#f5f5f5' }} />
              </Grid>
            ))}
          </Grid>
        ) : petData.length === 0 ? (
          /* Empty State */
          <Box sx={{ textAlign: "center", py: 6, width: "100%" }}>
            <Typography color="text.secondary" mb={2}>
              🐾 No breeds with images found
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => window.location.reload()}
              sx={{ borderColor: colorTheme, color: colorTheme }}
            >
              Try Again
            </Button>
          </Box>
        ) : (
          /* Cards Grid */
          <Grid container spacing={{ xs: 3, sm: 4 }} justifyContent="center" sx={{ width: "100%" }}>
            {petData.map((item) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={3} 
                key={item.id}
                sx={{ display: "flex", justifyContent: "center", width: { xs: "100%", sm: "auto" } }}
              > 
                <Card 
                  component="a"
                  href={`/details/${item.id}`}
                  sx={{ 
                    width: { xs: "100%", sm: "90%", md: "100%" }, 
                    maxWidth: 340,
                    height: "100%", 
                    display: 'flex', 
                    flexDirection: 'column', 
                    boxShadow: 3,
                    borderRadius: 3,
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 },
                    mx: { xs: "auto", sm: 0 }
                  }}
                >
                  <CardMedia 
                    component="img" 
                    height="200" 
                    // ✅ FIXED: Use image_url with reliable fallback
                    image={item.image_url || "https://via.placeholder.com/400x300?text=No+Image"} 
                    alt={item.name || "Dog breed"}
                    sx={{ 
                      objectFit: 'cover',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12
                    }}
                    // ✅ Fallback if image fails to load
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                    loading="lazy"
                  />
                  
                  <CardContent sx={{ flexGrow: 1, px: 2.5, pt: 2 }}>
                    <Typography variant="overline" color="textSecondary" fontWeight="700" sx={{ display: "block", mb: 0.5 }}>
                      {item.breed_group || "Breed"}
                    </Typography>
                    
                    <Typography variant="h6" fontWeight="700" sx={{ textTransform: 'capitalize', lineHeight: 1.3, mb: 1 }}>
                      {item.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.temperament?.split(',').slice(0, 3).join(', ')}...
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                      🕐 Life Span: <strong>{item.life_span}</strong>
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography 
                      variant="body2"
                      sx={{ color: colorTheme, fontWeight: '700', px: 2 }}
                    >
                      View Details →
                    </Typography>
                    
                    <Typography variant="caption" sx={{ bgcolor: '#f5f5f5', px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 500, color: '#555' }}>
                      {item.origin || 'Global'}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}