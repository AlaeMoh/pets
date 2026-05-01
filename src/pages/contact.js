import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  Alert,
  InputAdornment 
} from "@mui/material";

import PaymentForm from "../pages/payment";

export default function ContactPage() {
  const colorTheme = "#ff6a00";

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [contactMsg, setContactMsg] = useState("");

  const handleContactChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      setContactMsg("Please fill all fields");
      return;
    }
    setContactMsg("Message sent successfully!");
    setContactData({ name: "", email: "", message: "" });
  };

  const [amount, setAmount] = useState("10");

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
      <Grid container spacing={4} direction="column">
        
        {/* CONTACT FORM SECTION */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Contact Us
              </Typography>

              {contactMsg && (
                <Alert severity={contactMsg.includes("Please") ? "error" : "success"} sx={{ mb: 2 }}>
                  {contactMsg}
                </Alert>
              )}

              <Box component="form" onSubmit={handleContactSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={contactData.name}
                  onChange={handleContactChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={contactData.email}
                  onChange={handleContactChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  multiline
                  rows={4}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ 
                    mt: 3, 
                    py: 1.5,
                    backgroundColor: colorTheme,
                    '&:hover': { backgroundColor: "#e55f00" } 
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* PAYMENT SECTION (NOW BELOW) */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Support our Project
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={3}>
                Choose an amount to donate.
              </Typography>

              <TextField
                fullWidth
                label="Donation Amount"
                type="number"
                value={amount}
                inputProps={{ min: 1 }}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />

              <Box sx={{ width: "100%" }}>
                <PaymentForm amount={amount} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
}