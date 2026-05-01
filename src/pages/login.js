"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert
} from "@mui/material";
import { fetchUsers } from "../services/apis";
import { useNavigate } from "react-router-dom";
import Auth from "../auth/page"

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setIsSuccess(false);
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const users = await fetchUsers();

      const existingUser = users.find(
        (u) =>
          u.email === formData.email &&
          u.password === formData.password
      );

      if (existingUser) {
        setIsSuccess(true);
        setMessage(`Welcome back, ${existingUser.name}!`);

        localStorage.setItem("user", JSON.stringify(existingUser));

        setTimeout(() => {
          navigate("/");
        }, 1200);
      } else {
        setIsSuccess(false);
        setMessage("Invalid email or password. Try signing up!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setIsSuccess(false);
      setMessage("Error connecting to server");
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
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Sign In
        </Typography>

        {message && (
          <Alert severity={isSuccess ? "success" : "error"}>
            {message}
          </Alert>
        )}

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

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            backgroundColor: colorTheme,
            mt: 2,
            py: 1.2,
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#e65c00"
            }
          }}
        >
          Sign In
        </Button>
          <Auth></Auth>       
              <Typography
         sx={{ 
          mb: 2
        }}
        >
          Don't Have an account?{" "}
          <a href="/profile">
            Sign up
          </a>
        </Typography>
    </Box>


      </Box>
  );
}