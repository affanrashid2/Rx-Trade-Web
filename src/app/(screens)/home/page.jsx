"use client";
import React, { useEffect, useRef, useState } from "react";

import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { BannerImage, NotFound } from "@/assets";
import { Banner, ProductCard, SubHeader, BrowseCategories } from "@/components";
import ApiManager from "@/helper/api-manager";
import { setFilter, setToast } from "@/store/reducer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState({});
  const [bestSelling, SetBestSelling] = useState({});
  const [newProducts, setNewProducts] = useState({});
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.appReducer);

  const getFilteredProducts = async () => {
    setLoading(true);
    try {
      let { data } = await ApiManager("get", `products/filter-by-category?page=1&perPage=8&filterType=${filter?.value}`);
      setProducts(data?.response?.details);
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.message }));
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const [getFeaturedProduct, getBestSelling, newProducts] = await Promise.all([
        ApiManager("get", `products?page=1&perPage=8&isFeatured=true`),
        ApiManager("get", `products?page=1&perPage=8&isBestSelling=true`),
        ApiManager("get", `products?page=1&perPage=8`),
      ]);
      setFeaturedProducts(getFeaturedProduct?.data?.response?.details);
      SetBestSelling(getBestSelling?.data?.response?.details);
      setNewProducts(newProducts?.data?.response?.details);
    } catch (error) {
      dispatch(setToast({ type: "error", message: "Something Went Wrong" }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (filter?.title) {
      getFilteredProducts();
    }
  }, [filter]);

  // const handleFocus = (ref) => {
  //   if (ref.current) {
  //     ref.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <>
      <SubHeader />
      {/* <Banner image={BannerImage} /> */}
      <Container sx={{ my: 7, maxWidth: "1230px" }}>
        <Box
          sx={{
            overflowX: "hidden",
            "&:focus": { outline: "none" },
          }}
          tabIndex={-1}
        >
          <BrowseCategories />
        </Box>

        {filter?.title ? (
          <>
            <Stack direction="row" gap={2} alignItems="center">
              <Typography my={4} variant="h4" fontWeight="SemiBold">
                {filter?.title}
              </Typography>
              {/* <Link href="#">
                <Typography variant="body1" fontWeight="SemiBold">
                  Clear
                </Typography>
              </Link> */}
              <Button sx={{ fontWeight: "SemiBold", fontSize: "17px" }} onClick={() => dispatch(setFilter({}))}>
                Clear Filter
              </Button>
            </Stack>
            <ProductGrid loading={loading} products={products} />
          </>
        ) : (
          <>
            <div id="featured">
              <Section loading={loading} title="Featured Products" link="filtered-product/featured-products" products={featuredProducts} />
            </div>
            <div id="new">
              <Section loading={loading} title="New Products" link="filtered-product/new-products" products={newProducts} />
            </div>
            <div id="best">
              <Section loading={loading} title="Best Selling" link="filtered-product/best-selling" products={bestSelling} />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;

const RenderProducts = ({ products = [] }) => {
  return products.length ? (
    products.slice(0, 8).map((product) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
        <ProductCard product={product} />
      </Grid>
    ))
  ) : (
    <Stack width="max-content" mx="auto" justifyContent="center" alignItems="center" gap={2} my={2}>
      <Image src={NotFound} style={{ maxWidth: 150 }} alt="img" />
      <Typography textAlign="center" fontWeight="SemiBold" variant="h5">
        No Products Found
      </Typography>
    </Stack>
  );
};

const Section = ({ loading, title, link, products = [] }) => (
  <>
    <Stack justifyContent="space-between" direction="row">
      {loading ? (
        <Skeleton height="40px" width="20%" sx={{ my: 2 }} />
      ) : (
        <Typography my={4} variant="h4" fontWeight="SemiBold">
          {title}
        </Typography>
      )}
      <Button sx={{ alignSelf: "center" }}>
        <Link href={link}>
          <Typography variant="body1" fontWeight="SemiBold">
            View All
          </Typography>
        </Link>
      </Button>
    </Stack>
    <ProductGrid loading={loading} products={products} />
  </>
);

const ProductGrid = ({ loading, products = [] }) => (
  <Grid container columnSpacing={1} rowSpacing={2}>
    {loading ? (
      Array(8)
        .fill()
        .map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard loading={loading} />
          </Grid>
        ))
    ) : (
      <RenderProducts products={products} />
    )}
  </Grid>
);
