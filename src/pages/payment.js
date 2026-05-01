import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button, Box, Alert } from "@mui/material";

export default function PaymentForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount })
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("✅ Payment successful!");
      }
    } catch (err) {
      setMessage("❌ Payment failed");
      setTimeout(()=>{
        setMessage("")
      },3000)
    }

    setLoading(false);
  };

  return (
<Box
  component="form"
  onSubmit={handlePayment}
  sx={{
    width: "100%",
    maxWidth: 500,
    mx: "auto",
    p: { xs: 2, sm: 3 },
    borderRadius: 2,
    boxShadow: 3,
    bgcolor: "background.paper",
  }}
>
  <Box sx={{ mb: 3 }}>
    <CardElement
      options={{
        style: {
          base: {
            fontSize: "16px",
          },
        },
      }}
    />
  </Box>

  <Button
    type="submit"
    fullWidth
    variant="contained"
    disabled={loading}
    sx={{
      py: { xs: 1.2, sm: 1.5 },
      fontSize: { xs: "0.9rem", sm: "1rem" },
    }}
  >
    {loading ? "Processing..." : `Pay $${amount}`}
  </Button>

  {message && (
    <Alert sx={{ mt: 2 }} severity="info">
      {message}
    </Alert>
  )}
</Box>
  );
}