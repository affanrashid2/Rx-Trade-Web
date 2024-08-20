"use client";
import React from "react";

import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import Slider from "react-slick";

import { filteredProducts } from "@/global";
import { setFilter } from "@/store/reducer";

const BrowseCategories = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablet breakpoint
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // mobile breakpoint
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // smaller mobile breakpoint
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {filteredProducts?.map((card, index) => (
        <Box key={index} sx={{ padding: "10px" }}>
          <SliderCard item={card} />
        </Box>
      ))}
    </Slider>
  );
};

export default BrowseCategories;

const SliderCard = ({ item }) => {
  const Icon = item?.icon;
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        userSelect: "none",
      }}
      elevation={3}
    >
      <CardActionArea
        onClick={() => dispatch(setFilter({ ...item, icon: null }))}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          height: { xs: "120px", sm: "130px" },
        }}
      >
        {Icon && <Icon sx={{ width: "3rem", height: "3rem", color: "#236D7D" }} />}
        <Typography>{item?.title}</Typography>
      </CardActionArea>
    </Card>
  );
};
