import React, { useEffect, useState } from 'react';
import { fetchBreeds } from '../services/apis';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions,
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Skeleton,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function Pets() {
  const colorTheme = "#ff6a00";
  const [petData, setPetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPets = async () => {
      try {
        const data = await fetchBreeds();
        setPetData(data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      } finally {
        setLoading(false);
      }
    };
    getPets();
  }, []);

  // Skeleton loader
  const SkeletonCard = () => (
    <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 2 }}>
      <Skeleton variant="rectangular" height={180} animation="wave" sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
      <CardContent>
        <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="80%" height={32} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mt: 1 }} />
      </CardContent>
      <CardActions>
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 2 }} />
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 3 } }}>
      
      {/* Header - Centered on Mobile */}
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { xs: "center", sm: "space-between" },
        alignItems: "center",
        gap: { xs: 2, sm: 0 },
        mb: { xs: 4, md: 6 },
        textAlign: { xs: "center", sm: "left" }
      }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#333", fontSize: { xs: "1.5rem", md: "2rem" } }}>
          Our Pets
        </Typography>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {[...Array(8)].map((_, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : (
        /* ✅ CENTERED PET CARDS GRID */
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", // ✅ Centers all cards
          gap: { xs: 2.5, sm: 3, md: 4 }
        }}>
          {petData?.map((dog) => (
            <Box 
              key={dog.id} 
              sx={{ 
                width: "100%", 
                display: "flex", 
                justifyContent: "center" // ✅ Extra centering safety
              }}
            >
              <Link to={`/petdetail/${dog.id}`} style={{ textDecoration: "none", color: "inherit", width: "100%", maxWidth: 360 }}>
                <Card 
                  sx={{ 
                    height: "100%", 
                    display: "flex", 
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: 2,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": { 
                      transform: "translateY(-4px)", 
                      boxShadow: 6 
                    },
                    "&:active": { transform: "scale(0.98)" },
                    // ✅ Centering props:
                    width: { xs: "100%", sm: "95%" },
                    maxWidth: 360,
                    mx: "auto" // ✅ Auto margins = perfect center
                  }}
                >
                  {/* Image with aspect ratio */}
                  <Box sx={{ position: "relative", paddingTop: "75%" }}>
                    <CardMedia
                      component="img"
                      image={dog.image?.url || "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800"}
                      alt={dog.name}
                      sx={{
                        position: "absolute",
                        top: 0, left: 0, width: "100%", height: "100%",
                        objectFit: "cover",
                        borderTopLeftRadius: 12, borderTopRightRadius: 12
                      }}
                      loading="lazy"
                    />
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography variant="overline" fontWeight="700" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                      {dog.breed_group || "Breed"}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ 
                      textTransform: "capitalize", 
                      mb: 1,
                      // Truncate long names
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical"
                    }}>
                      {dog.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mb: 1.5 }}>
                      {dog.temperament?.split(",").slice(0, 3).join(", ")}...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🕐 <strong>Life:</strong> {dog.life_span}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0, justifyContent: "space-between" }}>
                    <Button size="small" sx={{ color: colorTheme, fontWeight: "bold", px: 2 }}>
                      View →
                    </Button>
                    <Typography variant="caption" sx={{ 
                      bgcolor: "#f5f5f5", px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 500 
                    }}>
                      {dog.origin || "Global"}
                    </Typography>
                  </CardActions>
                </Card>
              </Link>
            </Box>
          ))}
        </Box>
      )}

      {/* Empty State */}
      {!loading && petData?.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" mb={2}>No pets found 😕</Typography>
          <Button variant="contained" href="/" sx={{ backgroundColor: colorTheme }}>Go Home</Button>
        </Box>
      )}
    </Container>
  );
}