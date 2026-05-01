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
    maxWidth: { xs: "100%", sm: 450, md: 500 },
    mx: "auto",
    mt: { xs: 2, sm: 4 },
    p: { xs: 2, sm: 3 },
    borderRadius: { xs: 0, sm: 2 }, // full width on mobile
    boxShadow: { xs: 0, sm: 3 }, // remove shadow on mobile
    bgcolor: "background.paper",
  }}
>
  {/* Card Input */}
  <Box
    sx={{
      mb: 3,
      p: 2,
      borderRadius: 2,
      border: "1px solid #ccc",
      minHeight: 50,
      display: "flex",
      alignItems: "center",
    }}
  >
    <CardElement
      options={{
        style: {
          base: {
            fontSize: "16px", // 👈 important for mobile zoom
          },
        },
      }}
    />
  </Box>

  {/* Button */}
  <Button
    type="submit"
    fullWidth
    variant="contained"
    disabled={loading}
    sx={{
      py: { xs: 1.5, sm: 1.6 },
      fontSize: { xs: "1rem", sm: "1.1rem" },
      borderRadius: 2,
    }}
  >
    {loading ? "Processing..." : `Pay $${amount}`}
  </Button>

  {/* Message */}
  {message && (
    <Alert
      sx={{
        mt: 2,
        fontSize: { xs: "0.9rem", sm: "1rem" },
      }}
      severity="info"
    >
      {message}
    </Alert>
  )}
</Box>
  );
}