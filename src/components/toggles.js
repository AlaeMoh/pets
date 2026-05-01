"use client";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography } from "@mui/material";

export default function Toggles({ breeds, selectedId, onChange }) {
  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={selectedId}
      exclusive
      onChange={(e, newValue) => {
        if (newValue !== null) onChange(newValue);
      }}
      sx={{ width: 200 }}
    >
      {/* ALL BUTTON */}
      <ToggleButton value="all">
        <Typography>All</Typography>
      </ToggleButton>

      {/* BREEDS */}
      {breeds.map((breed) => (
        <ToggleButton key={breed.id} value={breed.id}>
          <Typography>{breed.name}</Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}