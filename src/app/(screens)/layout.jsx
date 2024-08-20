"use client";

import React from "react";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { Footer, Header } from "@/components";

const ScreensLayout = ({ children }) => {
  const { isLogged } = useSelector((state) => state.appReducer);
  const router = useRouter();
  if (!isLogged) {
    router.push("/login");
    return;
  }
  return (
    <>
      <Header />
      <Box sx={{ minHeight: "calc(100vh - 300px)" }}>{children}</Box>
      <Footer />
    </>
  );
};

export default ScreensLayout;
