"use client";
import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    title: "Browse Pets",
    description:
      "Explore available pets and find the one that matches your lifestyle and preferences.",
  },
  {
    title: "Submit Application",
    description:
      "Fill out a simple adoption form so we can understand your home and experience.",
  },
  {
    title: "Meet the Pet",
    description:
      "Schedule a visit or virtual meeting to interact with your future companion.",
  },
  {
    title: "Home Check",
    description:
      "We ensure your home is safe and suitable for your new pet.",
  },
  {
    title: "Finalize Adoption",
    description:
      "Complete paperwork and welcome your new family member home 🎉",
  },
];

export default function AdoptionProcess() {
  const navigate= useNavigate()

  return (
    <Box sx={{ py: 6 }}>
      
      {/* HERO */}
      <Container maxWidth="md">
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Adoption Process
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Bringing a pet into your home is a joyful journey. Follow these simple
          steps to adopt your new best friend.
        </Typography>
      </Container>

      {/* STEPPER (TOP OVERVIEW) */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Stepper alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>

      {/* DETAILED STEPS */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 3,
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {index + 1}. {step.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Ready to Adopt?
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Start your journey today and give a loving home to a pet in need.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#009788",
            px: 4,
            borderRadius: 3,
            "&:hover": {
              backgroundColor: "#00796b",
            },
          }}
          onClick={()=>{navigate("/allpets")}}
        >
          Browse Pets
        </Button>
      </Container>
    </Box>
  );
}