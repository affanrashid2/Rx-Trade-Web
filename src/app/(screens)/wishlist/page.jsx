"use client";
import React, { useEffect, useState } from "react";

import { Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { NoItemsIllustration, ProductCard } from "@/components";
import ApiManager from "@/helper/api-manager";
import { handleLoader, setToast } from "@/store/reducer";

const WishList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const getWishList = async () => {
    setLoading(true);
    try {
      let { data } = await ApiManager("get", `wishlists?page=${page}&perPage=8`);
      setProducts(data?.response?.details);
      setTotalPages(data?.response?.totalPages);
    } catch (error) {
      dispatch(
        setToast({
          type: "error",
          message: "Something Went Wrong",
        })
      );
    } finally {
      setLoading(false);
      dispatch(handleLoader(false));
    }
  };

  useEffect(() => {
    getWishList();
  }, [page]);

  const handleRemoveWishlist = (id) => {
    const updatedProducts = products?.filter((item) => item?.productId?._id !== id);
    setProducts(updatedProducts);
  };

  return (
    <Container maxWidth="lg">
      <Stack gap={3} py={8}>
        <Typography variant="h3" fontWeight="SemiBold" color="text.primary" gutterBottom>
          Wishlist
        </Typography>
        <Grid container spacing={1}>
          {loading ? (
            Array(4)
              .fill()
              .map((_, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <ProductCard loading={loading} />
                </Grid>
              ))
          ) : (
            <RenderProduct products={products} handleRemoveWishlist={handleRemoveWishlist} />
          )}
        </Grid>
        {!!products?.length && totalPages > 1 && (
          <Pagination count={totalPages} sx={{ mx: "auto", my: 5 }} color="primary" onChange={(_, value) => setPage(value)} />
        )}
      </Stack>
    </Container>
  );
};

export default WishList;

const RenderProduct = ({ products, handleRemoveWishlist }) => {
  return products?.length ? (
    products?.map((product, i) => (
      <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
        <ProductCard product={{ ...product?.productId, isWishlisted: true }} handleRemoveWishlist={handleRemoveWishlist} wishList />
      </Grid>
    ))
  ) : (
    <NoItemsIllustration />
  );
};
