import React from "react";
import { Stack } from "@mui/material";
import { Logo } from "@/assets";

export default function SplashScreen() {
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "relative",
          minHeight: "100dvh",
          p: 3,
        }}
      >
        <img src={Logo.src} alt="" width="500px" />
      </Stack>
    </>
  );
}
