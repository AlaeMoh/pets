import React, { useEffect,useState } from 'react'
import { fetchBreeds, fetchingPets } from '../services/apis'
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { 
  Typography, 
  Button, 
  Container, 
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
export default function Pets() {
    const colorTheme= "#ff6a00"
    const [petData, setPetData]= useState([])
    
    useEffect(() => {
        const getPets = async () => {
          try {
            const data = await fetchBreeds();
                    // console.log(data)
    
            setPetData(data);
          } catch (error) {
            console.error("Failed to fetch pets:", error);
          }
        };
    
        getPets();
      }, [])



  return (
     <Container maxWidth="lg" sx={{ py: 8 }}>
        <Container sx={{display:'flex' , justifyContent:"space-between"}}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          gutterBottom 
          sx={{ mb: 4, color: '#333' }}
        >
          Our Pets
        </Typography>

        </Container>


<Grid container spacing={4}>
  {petData?.map((dog) => (
    <Grid item xs={12} sm={6} md={3} key={dog.id}> 
      <Link 
        to={`/details/${dog.id}`} 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Card 
          sx={{ 
            height: "100%", 
            display: 'flex', 
            flexDirection: 'column', 
            boxShadow: 3,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.02)', boxShadow: 6 }
          }}
        >
          <CardMedia 
            component="img" 
            height="180" 
            image={dog.image?.url || "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop"} 
            alt={dog.name}
            sx={{ objectFit: 'cover' }}
          />
          
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="overline" color="textSecondary" fontWeight="bold">
              {/* FIXED: Using breed_group instead of category.name */}
              {dog.breed_group || "Hound"}
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
              {dog.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
              {/* Added: Temperament snippet from your new description */}
              {dog.temperament?.split(',').slice(0, 3).join(', ')}...
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Life Span: <strong>{dog.life_span} years</strong>
            </Typography>
          </CardContent>

          <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
            <Button 
              size="small" 
              sx={{ color: colorTheme, fontWeight: 'bold' }}
              href={`/details/${dog.id}`}
            >
              Details
            </Button>
            {/* FIXED: Showing Origin instead of a tag name */}
            <Typography variant="caption" sx={{ bgcolor: '#f0f0f0', px: 1, borderRadius: 1 }}>
              {dog.origin || 'Global'}
            </Typography>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  ))}
</Grid>
        
      </Container>
  )
}
