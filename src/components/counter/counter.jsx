"use client";

import React from "react";

import { AddCircleOutlineSharp, RemoveCircleOutlineSharp } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

const Counter = ({ initialValue = 1, handleChange = () => {}, disabled = false }) => {
  const handleCounter = (increment = true) => {
    if (increment) {
      handleChange(initialValue + 1);
    } else {
      handleChange(initialValue - 1, false);
    }
  };

  return (
    <Stack direction="row" alignItems="center" sx={{ width: "100px" }} justifyContent="space-between">
      <IconButton onClick={() => handleCounter(false)} disabled={initialValue == 1}>
        <RemoveCircleOutlineSharp />
      </IconButton>
      <Typography>{initialValue}</Typography>
      <IconButton disabled={disabled} onClick={handleCounter}>
        <AddCircleOutlineSharp />
      </IconButton>
    </Stack>
  );
};

export default Counter;
