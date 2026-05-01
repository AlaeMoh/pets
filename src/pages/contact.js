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

    setContactData({
      name: "",
      email: "",
      message: ""
    });
  };

  // 💰 Donation
  const [amount, setAmount] = useState("10");

  return (
    <Container sx={{ py: 8 }}>
      
      <Grid container spacing={5}>
        
        {/* CONTACT */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Contact Us
              </Typography>

              {contactMsg && (
                <Alert severity="success" sx={{ mb: 2 }}>
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
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={contactData.email}
                  onChange={handleContactChange}
                  margin="normal"
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
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, backgroundColor: colorTheme }}
                >
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

         <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: 3 , width:500, height:300}}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
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
                  sx={{ mb: 3 ,mt:2}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        $
                      </InputAdornment>
                    ),
                  }}
                />

               <PaymentForm amount={amount} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}