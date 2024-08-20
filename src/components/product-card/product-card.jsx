"use client";

import React, { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { LoadingButton } from "@mui/lab";
import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { Counter } from "..";
import { FavoriteBorderOutlinedIcon, ImgNotFound } from "@/assets";
import ApiManager from "@/helper/api-manager";
import useGetCartCount from "@/hooks/getCartCount";
import { setToast } from "@/store/reducer";
import Utils from "@/utils/utils";

const ProductCard = ({ product, loading = false, handleRemoveWishlist = () => {}, wishList }) => {
  const [counter, setCounter] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishListed, setIsWishListed] = useState(product?.isWishlisted);
  const dispatch = useDispatch();
  const getCartCount = useGetCartCount();
  let redirectTo = `/products/${product?._id}`;

  const handleChange = (count) => {
    setCounter(count);
  };

  const handleWishListed = async (id) => {
    try {
      if (!wishList) {
        setIsWishListed(!isWishListed);
      }
      await ApiManager("post", "wishlists", { productId: product?._id });
      handleRemoveWishlist(id);
    } catch (error) {
      dispatch(
        setToast({
          type: "error",
          message: "Something Went Wrong",
        })
      );
    }
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      let { data } = await ApiManager("post", "carts", {
        productId: product?._id,
        quantity: counter,
        action: "add",
      });
      dispatch(setToast({ type: "success", message: data?.message }));
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
    } finally {
      setIsLoading(false);
      await getCartCount();
    }
  };

  const renderSkeletonOrContent = (condition, content) => {
    return condition ? <Skeleton /> : content;
  };

  const renderProductInfo = (label, value, textTransform = "none") => (
    <Grid item xs={5.5}>
      <Box>
        {renderSkeletonOrContent(loading, <Typo>{label}</Typo>)}
        {renderSkeletonOrContent(
          loading,
          <Typography variant="caption" noWrap textTransform={textTransform}>
            {Utils.limitText(value ?? "-", 17)}
          </Typography>
        )}
      </Box>
    </Grid>
  );

  return (
    <Card sx={{ borderRadius: "4px", p: 2 }} elevation={2}>
      {loading ? (
        <Skeleton height={126} sx={{ borderRadius: 1.5 }} variant="rectangular" />
      ) : (
        <Link href={redirectTo}>
          <CardMedia
            sx={{
              height: 126,
              borderRadius: 1.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
            image={product?.photos?.length ? product?.photos?.[0] : ImgNotFound?.src}
            title={product?.name || "Product Image"}
          />
        </Link>
      )}
      <CardContent sx={{ p: 0 }}>
        {loading ? (
          <Skeleton variant="rectangular" sx={{ borderRadius: 1, my: 2 }} />
        ) : (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography my={2} gutterBottom variant="h5" fontWeight="medium">
              {Utils.limitText(product?.name, 15)}
            </Typography>
            <IconButton onClick={() => handleWishListed()} sx={{ p: 0, display: { xs: "flex", md: "none" } }}>
              {isWishListed ? <FavoriteIcon sx={{ color: isWishListed && "#F04461" }} /> : <FavoriteBorderOutlinedIcon />}
            </IconButton>
          </Stack>
        )}
        <Grid container columnSpacing={2} rowSpacing={1} alignItems="center" component={Link} href={redirectTo}>
          {/* 1st Row */}
          {renderProductInfo("NDC", product?.NDC)}
          <VerticalDivider />
          {renderProductInfo("Strength", product?.strength)}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/* 2nd Row */}
          {renderProductInfo("Manufacturer", product?.manufacturer)}
          <VerticalDivider />
          {renderProductInfo("AWP", `$${product?.AWP}`)}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/* 3rd Row */}
          {renderProductInfo("Dosage Form", product?.dosageForm, "capitalize")}
          <VerticalDivider />
          {renderProductInfo("WAC", `$${product?.WAC}`)}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/* 4th Row */}
          {renderProductInfo("Unit Price", `$${product?.unitPrice}`)}
          <VerticalDivider />
          {renderProductInfo("Total Price", `$${product?.totalPrice}`)}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/* 5th Row */}
          {renderProductInfo("Available", product?.available)}
          <VerticalDivider />
          {renderProductInfo("Source", product?.source, "capitalize")}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/* 6th Row */}
          {renderProductInfo("Pack Size", product?.packSize)}
          <VerticalDivider />
          {renderProductInfo("Expiration", moment(product?.expiration).format("MMM YYYY"))}
        </Grid>
      </CardContent>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} width={1}>
        <Stack direction="row" width={1} alignItems="center" my={1}>
          <IconButton onClick={() => handleWishListed(product?._id)} sx={{ p: 0, display: { xs: "none", md: "flex" } }}>
            {isWishListed ? <FavoriteIcon sx={{ color: isWishListed && "#F04461" }} /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
          <Counter handleChange={handleChange} initialValue={counter} disabled={product?.available < 1 || counter == product?.available} />
        </Stack>
        <LoadingButton
          onClick={handleAddToCart}
          loading={isLoading}
          variant="contained"
          size="large"
          sx={{ whiteSpace: "nowrap" }}
          disabled={product?.available < 1}
        >
          {product?.available >= 1 ? "Add to Cart" : "Out of Stock"}
        </LoadingButton>
      </Stack>
    </Card>
  );
};

export default ProductCard;

const Typo = ({ children }) => {
  return (
    <Typography fontWeight="SemiBold" variant="body2" color="text.darkGrey">
      {children}
    </Typography>
  );
};

const VerticalDivider = () => {
  return (
    <Grid item xs={1}>
      <Box
        sx={{
          height: "35px",
          bgcolor: "divider",
          width: "1px",
          maxWidth: "1px",
          mx: "auto",
        }}
      />
    </Grid>
  );
};
