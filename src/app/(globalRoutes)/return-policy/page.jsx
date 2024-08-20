"use client";
import React from "react";

import { Breadcrumbs, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const TermsAndConditions = () => {
  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,

    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      Return Policy
    </Typography>,
  ];
  return (
    <Container maxWidth="lg">
      <Stack py={8} gap={4}>
        <Breadcrumbs separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <Typography variant="h3" fontWeight="SemiBold" color="text.heading">
          Return Policy
        </Typography>
        <Typography>
        Our products have varying return policies that vary from the vendor which it was purchased. Please contact us at <a  href="mailto:contact@rxtradesolutions.com">contact@rxtradesolutions.com</a> for assistance.
        </Typography>
      
      </Stack>
    </Container>
  );
};

export default TermsAndConditions;
