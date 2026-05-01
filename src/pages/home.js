import React, { useEffect,useState } from 'react'
import { fetchingPets , fetchBreeds} from '../services/apis'

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
          bgcolor: '#009788', 
          py: 10, 
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                fontWeight="800" 
                gutterBottom 
                sx={{ color: '#fff', lineHeight: 1.2 }}
              >
                Elevate Your Pet Experience
              </Typography>
              
              <Typography 
                variant="h5" 
                paragraph 
                sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 4 }}
              >
                Wet Nose Warm Heart...
              </Typography>
              
              <Stack direction="row" spacing={2} justifyContent="flex-start">
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    px: 4, 
                    backgroundColor: colorTheme,
                    '&:hover': { backgroundColor: colorTheme, filter: 'brightness(0.9)' } 
                  }}
                  
                  onClick={()=>{navigate("/allPets")}}
                >
                  Adoption
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={()=>{navigate('/contactus')}}
                  sx={{ 
                    px: 4, 
                    color: "#fff",            
                    borderColor: "#fff", 
                    '&:hover': {
                      borderColor: colorTheme,    
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    }
                  }}
                >
                  Donation
                </Button>      
              </Stack>
            </Grid>
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
  
<Grid container spacing={4}>
    {petData?.map((item) => (
      <Grid item xs={12} sm={6} md={3} key={item.id}> 
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
            /* FIXED: Accessing the nested image.url from your new data */
            image={item.image?.url || "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop"} 
            alt={item.name}
            sx={{ objectFit: 'cover' }}
          />
          
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="overline" color="textSecondary" fontWeight="bold">
              {/* FIXED: Using breed_group instead of category.name */}
              {item.breed_group || "Hound"}
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
              {item.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
              {/* Added: Temperament snippet from your new description */}
              {item.temperament?.split(',').slice(0, 3).join(', ')}...
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Life Span: <strong>{item.life_span} years</strong>
            </Typography>
          </CardContent>

          <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
            <Button 
              size="small" 
              sx={{ color: colorTheme, fontWeight: 'bold' }}
              href={`/details/${item.id}`}
            >
              Details
            </Button>
            {/* FIXED: Showing Origin instead of a tag name */}
            <Typography variant="caption" sx={{ bgcolor: '#f0f0f0', px: 1, borderRadius: 1 }}>
              {item.origin || 'Global'}
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
