import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Grid, Typography, Button, Box, Paper, 
  Chip, Divider, CircularProgress, Stack 
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PetsIcon from '@mui/icons-material/Pets';
import { fetchBreedsByID } from '../services/apis';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const pets = await fetchBreedsByID(id);
        setPet(pets);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPetDetails();
  }, [id]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress sx={{ color: '#ff6a00' }} />
    </Box>
  );

  if (!pet) return <Typography variant="h5" textAlign="center" mt={10}>Pet not found.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={5}>
        
        {/* Left Side: Image Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ overflow: 'hidden', borderRadius: 4 }}>
            <img 
              src={pet.image?.url} 
              alt={pet.name} 
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '600px', objectFit: 'cover' }}
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
            
            <Stack direction="row" spacing={1} mb={3}>
              <Chip label={`Life Span: ${pet.life_span}`} color="primary" variant="outlined" />
              <Chip label={`Origin: ${pet.origin || 'Global'}`} variant="outlined" />
            </Stack>

            <Typography variant="h6" fontWeight="bold" gutterBottom>Temperament</Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontStyle: 'italic' }}>
              {pet.temperament}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Weight</Typography>
                <Typography variant="body1" fontWeight="bold">{pet.weight?.imperial} lbs</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Height</Typography>
                <Typography variant="body1" fontWeight="bold">{pet.height?.imperial} inches</Typography>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Stack direction="column" spacing={2}>
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
                onClick={()=>{navigate("/adoption")}}
              >
                Adopt {pet.name}
              </Button>
              
            </Stack>
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
}