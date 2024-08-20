"use client";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
const Banner = ({ image, text = "" }) => {
  const { user } = useSelector((state) => state.appReducer);
  return (
    <Stack
      sx={{
        maxHeight: "580px",
        width: 1,
        height: "80vh",
        background: `url(${image?.src}) no-repeat center center`,
        backgroundSize: "cover",
        padding: 0,
      }}
      justifyContent="center"
      alignItems="flex-end"
    >
      <Stack
        component={Container}
        justifyContent="center"
        alignItems="flex-end"
        gap={2}
      >
        <Stack gap={1}>
          {/* <Typography fontWeight="bold" variant="h6" color="white" textAlign="right" sx={{ mb: 2 }}>{moment().format('DD-MMMM-YYYY')}</Typography> */}
          {user ? (
            <Typography
              variant="h2"
              fontWeight="bold"
              color="white"
              textAlign="right"
            >
              Start Browsing
            </Typography>
          ) : (
            <>
              <Typography
                variant="h2"
                fontWeight="bold"
                color="white"
                textAlign="right"
              >
                Create an
              </Typography>
              <Typography
                variant="h2"
                fontWeight="bold"
                color="white"
                textAlign="right"
              >
                Account Now
              </Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Banner;

const style = {
  typo: {
    color: "white",
  },
  btn: {
    bgcolor: "white",
    borderRadius: "120px",
    color: "secondary.main",
  },
};
