import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Box, Alert, Typography } from "@mui/material";

export default function PaymentForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) * 100 }) // Stripe expects cents
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        setMessage(`❌ ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("✅ Payment successful! Thank you.");
      }
    } catch (err) {
      setMessage("❌ Connection failed. Please check your server.");
    }

    setLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handlePayment}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
        Credit or Debit Card
      </Typography>
      
      <Box
        sx={{
          mb: 3,
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "#fcfcfc",
          "& .StripeElement": {
            width: "100%"
          }
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading || !stripe}
        size="large"
        sx={{
          py: 1.5,
          fontWeight: "bold",
          backgroundColor: "#ff6a00",
          "&:hover": { backgroundColor: "#e55f00" }
        }}
      >
        {loading ? "Processing..." : `Donate $${amount}`}
      </Button>

      {message && (
        <Alert 
          sx={{ mt: 2 }} 
          severity={message.includes("✅") ? "success" : "error"}
        >
          {message}
        </Alert>
      )}
    </Box>
  );
}