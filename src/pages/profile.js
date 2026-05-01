"use client";
import React, {  useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Typography
} from "@mui/material";
import { fetchUsers } from "../services/apis";
import { useNavigate } from "react-router-dom";
import Auth from "../auth/page"
export default function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    agree: false
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (!formData.name || !formData.email || !formData.password) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    if (!formData.agree) {
      setMessage("⚠️ You must agree to terms");
      return;
    }

    try {
      const users = await fetchUsers();

      const existingUser = users.find(
        (user) => user.email === formData.email
      );

      if (existingUser) {
        setMessage("⚠️ Already have an account, try Sign In");
        return;
      }

      const res = await fetch(
        "https://69f23f51b15130b97352bb16.mockapi.io/users/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        setMessage("✅ Account created successfully!");

        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          agree: false
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setMessage("❌ Failed to register user");
      }
    } catch (error) {
      setMessage("❌ Error connecting to server");
    }
  };

  const colorTheme = "#ff6a00";

  return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9f9f9"
          }}
        >
    <Box
      component="form"
      onSubmit={handleSubmit}
        sx={{
          width: { xs: "90%", sm: 400 },
          p: 4,
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
    >

            {message && (
        <Typography textAlign="center" color="error">
          {message}
        </Typography>
      )}


      <Typography variant="h4" textAlign="center">
        Sign up
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
      />

      <FormControlLabel
        control={
          <Checkbox
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
        }
        label="I agree to terms"
      />

      <Button
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: colorTheme,
            mt: 2,
            py: 1.2,
            fontSize: "16px",
        }}
      >
        sign Up
      </Button>
        <Auth></Auth>
      <Typography
         sx={{       
          mb: 2
        }}
        >
          Have an account?{" "}
          <a href="/login">
            Sign In
          </a>
        </Typography>
    </Box>
    </Box>
  );
}