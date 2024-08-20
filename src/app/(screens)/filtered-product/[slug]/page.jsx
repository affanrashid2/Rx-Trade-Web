"use client";
import React, { useEffect, useState } from "react";

import { Button, Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { NoItemsIllustration, ProductCard } from "@/components";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";

export default function FilterProduct({ params }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = params;
  let path;
  let title;
  if (slug === "best-selling") {
    title = "Best Selling";
    path = `products?page=${page}&perPage=12&isBestSelling=true`;
  } else if (slug === "featured-products") {
    title = "Featured Products";
    path = `products?page=${page}&perPage=12&isFeatured=true`;
  } else {
    title = "New Products";
    path = `products?page=${page}&perPage=12`;
  }

  const getProducts = async () => {
    setLoading(true);
    try {
      let { data } = await ApiManager("get", path);
      setProducts(data?.response?.details);
      setTotalPages(data?.response?.totalPages);
    } catch (error) {
      dispatch(setToast({ type: "error", message: "Something Went Wrong" }));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <Container maxWidth="lg">
      <Stack sx={{ my: 5 }}>
        <Button sx={{ alignSelf: "flex-start", p: 1 }} onClick={() => router.back()}>
          Back
        </Button>
        <Typography my={4} variant="h4" fontWeight="SemiBold">
          {title}
        </Typography>
        <Grid container columnSpacing={1} rowSpacing={2}>
          {loading ? (
            Array(8)
              .fill()
              .map((_, i) => {
                return (
                  <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                    <ProductCard loading={loading} />
                  </Grid>
                );
              })
          ) : (
            <RenderProducts products={products} />
          )}
        </Grid>
        {products?.length && totalPages > 1 ? (
          <Pagination count={totalPages} sx={{ mx: "auto", my: 5 }} color="primary" onChange={(_, value) => setPage(value)} />
        ) : (
          ""
        )}
      </Stack>
    </Container>
  );
}

const RenderProducts = ({ products }) => {
  return products?.length ? (
    products?.map((product) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product?._id}>
        <ProductCard product={product} />
      </Grid>
    ))
  ) : (
    <NoItemsIllustration />
  );
};
