import React from "react";
import { Stack, Typography } from "@mui/material";
import { NotFound } from "@/assets";
import Image from "next/image";

const NoItemsIllustration = ({ text = "No Products Found" }) => {
  return (
    <Stack
      width="max-content"
      mx="auto"
      justifyContent="center"
      alignItems="center"
      gap={2}
      my={2}
    >
      <Image src={NotFound} style={{ maxWidth: 150 }} />
      <Typography textAlign="center" fontWeight="SemiBold" variant="h5">
        {text}
      </Typography>
    </Stack>
  );
};

export default NoItemsIllustration;
