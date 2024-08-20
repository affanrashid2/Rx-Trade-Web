"use client";
import React, { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { LoadingButton } from "@mui/lab";
import { Box, Breadcrumbs, Button, Card, Container, Grid, IconButton, Paper, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { AuthBg, FavoriteBorderOutlinedIcon, ImgNotFound } from "@/assets";
import { AddCartBtn, Counter, ProductCard } from "@/components";
import ApiManager from "@/helper/api-manager";
import useGetCartCount from "@/hooks/getCartCount";
import { setToast } from "@/store/reducer";
import Utils from "@/utils/utils";

const ProductDetails = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const { ProductId } = params;

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await ApiManager("get", `products/${ProductId}`);
      setProduct(data?.response?.details);
    } catch (error) {
      dispatch(
        setToast({
          type: "error",
          message: "Something Went Wrong",
        })
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,

    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      Product
    </Typography>,
  ];
  return (
    <Container maxWidth="lg">
      <Stack gap={5} py={8}>
        <Breadcrumbs separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <ProductDetailsCard product={product} loading={loading} />
        <Stack gap={1}>
          {loading ? (
            <>
              <Typography variant="h5" fontWeight="SemiBold">
                Description
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: "28px" }} fontWeight="regular">
                <Skeleton width="100%" />
                <Skeleton width="80%" />
                <Skeleton width="100%" />
                <Skeleton width="80%" />
              </Typography>
            </>
          ) : product?.description ? (
            <>
              <Typography variant="h5" fontWeight="SemiBold">
                Description
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: "28px" }} fontWeight="regular">
                {product?.description}
              </Typography>
            </>
          ) : (
            ""
          )}
        </Stack>
        <Stack>
          <Typography variant="h4" fontWeight="SemiBold">
            Suggested Items
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          {loading ? (
            Array(4)
              .fill()
              .map((_, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <ProductCard loading={loading} />
                </Grid>
              ))
          ) : (
            <RenderProduct product={product} />
          )}
        </Grid>
      </Stack>
    </Container>
  );
};

export default ProductDetails;

const ProductDetailsCard = ({ product, loading }) => {
  const [isWishlisted, setIsWishListed] = useState(false);
  const [counter, setCounter] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getCartCount = useGetCartCount();
  const dispatch = useDispatch();
  const handleWishListed = async () => {
    setIsWishListed(!isWishlisted);
    await ApiManager("post", "wishlists", { productId: product?._id });
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

  const handleChange = (count) => {
    setCounter(count);
  };
  useEffect(() => {
    setIsWishListed(product?.isWishListed);
  }, [product]);
  return (
    <Card sx={{ display: "flex", p: { xs: 2, sm: 4 } }}>
      <Stack direction={{ xs: "column", md: "row" }} width={1} gap={3}>
        <Box
          sx={{
            height: { xs: 280, md: "100%" },
            width: { xs: "100%", md: 300 },
            minWidth: { xs: "100%", md: 300 },
            borderRadius: "6px",
          }}
        >
          {loading ? (
            <Skeleton variant="rectangular" height="100%" />
          ) : (
            <Image
              alt=""
              src={product?.photos?.length ? product?.photos[0] : ImgNotFound}
              height={400}
              width={400}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          )}
        </Box>

        <Stack justifyContent="space-between" gap={{ xs: 5, md: 3 }}>
          <Stack justifyContent="space-between" direction="row" alignItems="flex-start" width={1}>
            <Stack>
              {loading ? (
                <Skeleton variant="rectangular" width={170} />
              ) : (
                <Typography variant="h3" fontWeight="Regular">
                  {product?.name}
                </Typography>
              )}
              {/* {loading ? (
                <Skeleton width={150} />
              ) : (
                <Typography variant="h6" fontWeight="SemiBold" color="text.paper">
                  {product?.formula}
                </Typography>
              )} */}
            </Stack>
            <IconButton onClick={handleWishListed}>
              {isWishlisted ? (
                <FavoriteIcon sx={{ color: isWishlisted && "#F04461", fontSize: "2rem" }} />
              ) : (
                <FavoriteBorderOutlinedIcon sx={{ fontSize: "2rem" }} />
              )}
            </IconButton>
          </Stack>
          <Stack direction="row" gap={2} flexWrap="wrap">
            <Grid container spacing={1}>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <TitleCard title="Manufacturer" value={product?.manufacturer || "-"} loading={loading} />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <TitleCard title="Pack Size" value={product?.packSize || "-"} loading={loading} />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <TitleCard title="Strength" value={product?.strength || "-"} loading={loading} />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <TitleCard title="Source" value={product?.source || "-"} loading={loading} />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <TitleCard title="Unit Price" value={product?.unitPrice ? `$${product?.unitPrice}` : "-"} loading={loading} />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <TitleCard title="NDC " value={product?.NDC || "-"} loading={loading} />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <TitleCard title="Available" value={product?.available > 0 ? product?.available : "0"} loading={loading} />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <TitleCard title="Total Price" value={product?.totalPrice ? `$${product?.totalPrice}` : "-"} loading={loading} />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                {/* <TitleCard title="Dosage Form" value={Utils.limitText(`${product?.dosageForm || "-"}`, 17)} loading={loading} /> */}
                <TitleCard title="Dosage Form" value={product?.dosageForm || "-"} loading={loading} />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <TitleCard title="Expiration" value={product?.expiration ? moment(product?.expiration).format("MMM YYYY") : "-"} loading={loading} />
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <TitleCard title="WAC" value={product?.WAC ? `$${product?.WAC}` : "-"} loading={loading} />
              </Grid>
            </Grid>
          </Stack>
          <Stack sx={{ alignSelf: { xs: "center", md: "flex-end" } }} direction="row" gap={2}>
            {product?.available ? (
              <>
                <Counter handleChange={handleChange} initialValue={counter} disabled={counter == product?.available} />
                <LoadingButton
                  onClick={handleAddToCart}
                  loading={isLoading}
                  variant="contained"
                  disabled={!product?.available}
                  size="large"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Add to Cart
                </LoadingButton>
              </>
            ) : (
              <Button disabled variant="contained">
                Out Of Stock
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

const TitleCard = ({ title, value, loading }) => {
  return (
    <Paper
      sx={{
        p: { xs: 0.5, sm: 1.5 },
        boxShadow: "none",
        border: "1px solid var(--White-Color, #F6F6F6) ",
        height: "100%",
      }}
    >
      <Stack alignItems="center" gap={0.5} height={1}>
        <Typography whiteSpace="nowrap" color="text.paper" fontWeight="SemiBold">
          {title}
        </Typography>
        {loading ? <Skeleton variant="rectangular" width="100%" /> : <Typography>{value}</Typography>}
      </Stack>
    </Paper>
  );
};

const RenderProduct = ({ product }) => {
  return product?.suggestProducts?.length ? (
    product?.suggestProducts?.map((product, i) => (
      <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
        <ProductCard product={product} />
      </Grid>
    ))
  ) : (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      No Product found
    </Grid>
  );
};
