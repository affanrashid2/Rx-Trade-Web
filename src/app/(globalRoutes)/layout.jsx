'use client'
import { Footer, Header } from "@/components";
import { Box, Container, Stack } from "@mui/material";
import React from "react";

const Layout = ({ children }) => {
  return (
 <>
      <Header />
      <Container
        sx={{ minHeight: "calc(100vh - 420px)" }}
        maxWidth="lg"
        >
        {children}
      </Container>
      <Footer />
        </>

  );
};

export default Layout;
