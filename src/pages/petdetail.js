"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Grid, Typography, Button, Box, Paper, 
  Chip, Divider, CircularProgress, Stack 
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { fetchBreedsByID } from '../services/apis';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchBreedsByID(id);
        
        if (!data) {
          throw new Error("Breed not found");
        }
        
        setPet(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching pet details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchPetDetails();
  }, [id]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress sx={{ color: '#ff6a00' }} />
    </Box>
  );

  if (error || !pet) return (
    <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
      <Typography variant="h5" color="error" gutterBottom>
        {error || "Pet not found"}
      </Typography>
      <Button variant="contained" onClick={() => navigate('/pets')} sx={{ mt: 2, bgcolor: '#ff6a00' }}>
        Back to Breeds
      </Button>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={5}>
        
        {/* Left Side: Image Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ overflow: 'hidden', borderRadius: 4, bgcolor: '#f5f5f5' }}>
            <img 
              // ✅ Ensure image_url is always a string (never undefined)
              src={pet.image_url || "https://via.placeholder.com/600x400?text=No+Image"} 
              alt={pet.name || "Dog breed"} 
              style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block', 
                maxHeight: '600px', 
                objectFit: 'cover',
                minHeight: '300px' // ✅ Prevent collapse if image fails
              }}
              onError={(e) => {
                // ✅ Double fallback if CDN image fails
                console.warn("Image failed to load:", e.target.src);
                e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Found";
                e.target.style.minHeight = '300px';
              }}
              loading="lazy"
            />
          </Paper>
        </Grid>

        {/* Right Side: Details Section */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
              {pet.breed_group || "Companion"}
            </Typography>
            <Typography variant="h2" fontWeight="800" gutterBottom sx={{ color: '#333' }}>
              {pet.name}
            </Typography>
            
            <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
              <Chip label={`Life: ${pet.life_span}`} color="primary" variant="outlined" />
              <Chip label={`Origin: ${pet.origin || 'Global'}`} variant="outlined" />
              {pet.weight?.metric && <Chip label={`Weight: ${pet.weight.metric} kg`} variant="outlined" />}
            </Stack>

            <Typography variant="h6" fontWeight="bold" gutterBottom>Temperament</Typography>
            <Box sx={{ mb: 2 }}>
              {pet.temperament?.split(",").map((temp, idx) => (
                <Chip 
                  key={idx} 
                  label={temp.trim()} 
                  size="small" 
                  sx={{ mr: 1, mb: 1 }} 
                  variant="outlined"
                />
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>Description</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {pet.description || "No description available."}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Weight</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {pet.weight?.imperial || 'N/A'} lbs
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Height</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {pet.height?.imperial || 'N/A'} inches
                </Typography>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<PetsIcon />}
                onClick={() => navigate('/adoption')}
                sx={{ 
                  bgcolor: '#ff6a00', 
                  '&:hover': { bgcolor: '#e65f00' },
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                Adopt {pet.name}
              </Button>
              
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => navigate('/pets')}
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  borderColor: '#ff6a00',
                  color: '#ff6a00',
                  '&:hover': { borderColor: '#e65f00', bgcolor: '#fff5eb' }
                }}
              >
                Back
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}