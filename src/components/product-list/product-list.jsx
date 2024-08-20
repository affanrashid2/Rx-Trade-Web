import React from "react";

import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";

import Utils from "@/utils/utils";
import { ImgNotFound } from "@/assets";

const ProductList = ({ product }) => {
  return (
    <Paper component={Stack} direction="row" justifyContent="space-between" variant="outlined" sx={{ p: 1, border: "1px solid #d4d4d4" }}>
      <Stack direction="row" gap={2}>
        <Box height={40} width={40}> 

        {
          product?.photos?.length ?
          <Image src={product?.photos[0]} unoptimized width={20} style={{
            height:'100%',
            width:'100%',
            borderRadius:'3px'
          }} height={20} alt="" />:
          <Image src={ImgNotFound} style={{
            height:'100%',
            width:'100%',
            borderRadius:'4px'
          }} width={40} height={40} alt="" />
        }
        </Box>
        <Box>
          <Typography fontWeight="SemiBold">{`${Utils.limitText(product?.name, 15)}`}</Typography>
          <Typography variant="body2">{`$${product?.totalPrice} x ${product?.quantity}`}</Typography>
        </Box>
      </Stack>
      <Typography fontWeight="SemiBold">{`$${product?.totalAmount}`}</Typography>
    </Paper>
  );
};

export default ProductList;
