"use client";
import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

const team = [
  { name: "Alaa Saleh", role: "Frontend Developer" },
  { name: "Sara Ahmed", role: "Pet Specialist" },
  { name: "Omar Hassan", role: "Adoption Manager" },
];

export default function AboutUs() {
  const { t } = useLanguage();

  return (
    <Box sx={{ py: 6 }}>
      
      {/* HERO */}
      <Container maxWidth="md">
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >{t("about")}
          
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
         
          
        >
           {t("aboutDesc")}
        </Typography>
      </Container>

      {/* MISSION & VISION */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                   {t("mission")}
                </Typography>
                <Typography color="text.secondary">
                {t("missionDesc")}
                 </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {t("vision")}
 
                 </Typography>
                <Typography color="text.secondary">
                 {t("visionDesc")}

                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* WHY CHOOSE US */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          {t("whyChoose")}
        </Typography>

<Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
  {t("whyChoose")}
</Typography>

<Grid container spacing={4} sx={{ mt: 2 }}>
  {t("features").map((item, index) => (
    <Grid item xs={12} md={3} key={index}>
      <Card sx={{ borderRadius: 4, textAlign: "center", p: 2 }}>
        <CardContent>
          <Typography fontWeight="bold">{item}</Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
      </Container>

      {/* TEAM */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
         {t("team")}
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {team.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ borderRadius: 4, textAlign: "center", p: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "auto",
                    mb: 2,
                    bgcolor: "#009788",
                  }}
                >
                  {member.name.charAt(0)}
                </Avatar>

                <Typography variant="h6" fontWeight="bold">
                  {member.name}
                </Typography>

                <Typography color="text.secondary">
                  {member.role}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t("ctaTitle")}
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {t("ctaDesc")}
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
        >
          {t("browse")}
        </Button>
      </Container>
    </Box>
  );
}