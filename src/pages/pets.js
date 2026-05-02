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
      
      {/* Header */}
      <Box sx={{ 
        display: "flex", flexDirection: { xs: "column", sm: "row" },
        justifyContent: { xs: "center", sm: "space-between" },
        alignItems: "center", gap: { xs: 2, sm: 0 }, mb: { xs: 4, md: 6 }
      }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#333", fontSize: { xs: "1.5rem", md: "2rem" }, textAlign: { xs: "center", sm: "left" } }}>
          Our Pets
        </Typography>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {[...Array(8)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i} sx={{ display: "flex", justifyContent: "center" }}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : (
        /* ✅ RESPONSIVE GRID: 1 mobile → 2 tablet → 3 laptop → 4 desktop */
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {petData?.map((dog) => (
            <Grid 
              item 
              xs={12}  // 📱 Mobile: 1 card per row (12/12)
              sm={6}   // 📱 Tablet: 2 cards per row (6/12)
              md={4}   // 💻 Laptop: 3 cards per row (4/12)
              lg={3}   // 🖥️ Desktop: 4 cards per row (3/12)
              key={dog.id}
              sx={{ display: "flex", justifyContent: "center" }} // ✅ Centers card when it doesn't fill full width
            >
              <Link to={`/petdetail/${dog.id}`} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                <Card 
                  sx={{ 
                    height: "100%", 
                    width: "100%", 
                    maxWidth: { xs: "100%", sm: "95%", md: "100%" },
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
                  }}
                >
                  {/* Aspect Ratio Image */}
                  <Box sx={{ position: "relative", paddingTop: "75%" }}>
                    <CardMedia
                      component="img"
                      image={dog.image?.url || "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800"}
                      alt={dog.name}
                      sx={{
                        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                        objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12
                      }}
                      loading="lazy"
                    />
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
                    <Typography variant="overline" fontWeight="700" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                      {dog.breed_group || "Breed"}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ 
                      textTransform: "capitalize", mb: 1,
                      overflow: "hidden", textOverflow: "ellipsis",
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
                    }}>
                      {dog.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mb: 1.5, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                      {dog.temperament?.split(",").slice(0, 3).join(", ")}...
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize={{ xs: "0.85rem", sm: "0.9rem" }}>
                      🕐 <strong>Life:</strong> {dog.life_span}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ px: { xs: 2, sm: 2.5 }, pb: { xs: 2, sm: 2.5 }, pt: 0, justifyContent: "space-between" }}>
                    <Button size="small" sx={{ color: colorTheme, fontWeight: "bold", px: 2 }}>
                      View →
                    </Button>
                    <Typography variant="caption" sx={{ bgcolor: "#f5f5f5", px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 500 }}>
                      {dog.origin || "Global"}
                    </Typography>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
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