"use client";

import React from "react";

import { AppBar, Box, Stack, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { setFilter } from "@/store/reducer";

const SubHeader = () => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:900px)");

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
      <AppBar position="static" sx={{ bgcolor: "#EDFCFF" }}>
        <Toolbar variant="dense">
          <Stack direction="row" justifyContent="space-around" width={{ sm: "100%", md: "70%" }} mx="auto" py={2} gap={2}>
            {[
              { id: "featured", title: "Featured Products" },
              { id: "new", title: "New Products" },
              { id: "best", title: "Best Selling" },
            ].map((opt, i) => {
              return (
                <Box key={i} component="a" href={`#${opt?.id}`} onClick={() => dispatch(setFilter({}))}>
                  <Typography
                    variant={matches ? "body1" : "body2"}
                    color="text.heading"
                    // fontWeight="Medium"
                    component="div"
                    sx={{ cursor: "pointer" }}
                  >
                    {opt?.title}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SubHeader;
