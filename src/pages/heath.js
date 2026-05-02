import React, { useEffect, useState } from 'react'
import { fetchHealthTips } from '../services/apis'
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

export default function Heath() {
    const colorTheme= "#ff6a00"

  const [ petFacts, setPetFacts]= useState([])

    useEffect(() => {
        const fetchedTips = async () => {
          try {
            const data = await fetchHealthTips();
                    // console.log(data)
    
            setPetFacts(data);
          } catch (error) {
            console.error("Failed to fetch pets:", error);
          }
        };
    
        fetchedTips();
      }, [])






  return (
   
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        🐾 Fun Facts About Pets
      </Typography>

      <Grid container spacing={3}>
        {petFacts?.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{color:colorTheme}}>
                  Fact:
                </Typography>
                <Typography variant="body1">
                  {item.attributes.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
