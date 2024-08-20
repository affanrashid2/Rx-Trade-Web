"use client";
import { useEffect, useState } from "react";

import { Container, Grid, InputAdornment, Pagination, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { AuthBg, SearchIcon } from "@/assets";
import { Banner, InputField, NoItemsIllustration, ProductCard, SearchInputMultiSelect, SelectBox } from "@/components";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";

const Search = () => {
  const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const getProducts = async () => {
    setLoading(true);
    try {
      let _url;
      if (selectedVendor) {
        _url = `products?page=${page}&perPage=6&sortBy=${sortBy}&vendorId=${selectedVendor?._id}&search=${search}`;
      } else {
        _url = `products?page=${page}&perPage=6&sortBy=${sortBy}&search=${search}`;
      }
      let { data } = await ApiManager("get", _url);

      setProducts(data?.response);
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
    getProducts();
  }, [sortBy, selectedVendor, search, page]);

  return (
    <>
      {/* <Banner image={AuthBg} /> */}
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Grid container minHeight={"100vh"} spacing={5}>
          <Grid item lg={3} xs={12}>
            <Typography color="text.heading" variant="h3" fontWeight="SemiBold">
              Search
            </Typography>
            <Stack gap={3} mt={3}>
              <InputField
                placeHolder="Search"
                label="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <SearchInputMultiSelect
                apiUrl={"users?role=vendor&page=1&perPage=9999999"}
                size="large"
                setVendor={(vendor) => {
                  setSelectedVendor(vendor);
                }}
                label="Vendors"
              />
            </Stack>
          </Grid>
          <Grid item container xs={12} lg={9} spacing={3}>
            <Grid item xs={12}>
              <SelectBox
                styles={{ maxWidth: 150, ml: "auto" }}
                color="#f6f7fb"
                label="Sort By"
                items={sortOpt}
                optionRenderKeys={{
                  name: "label",
                  value: "value",
                }}
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
                value={sortBy}
              />
            </Grid>
            {loading ? (
              Array(4)
                .fill()
                .map((_, i) => (
                  <Grid key={i} item xs={12} sm={12 / 2} md={12 / 3}>
                    <ProductCard loading={loading} />
                  </Grid>
                ))
            ) : (
              <RenderProduct products={products?.details} />
            )}
          </Grid>
        </Grid>

        <Stack justifyContent="center" alignItems="center">
          {products?.totalPages > 1 && (
            <Pagination count={products?.totalPages} sx={{ mx: "auto", my: 5 }} color="primary" onChange={(_, value) => setPage(value)} />
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Search;

const sortOpt = [
  {
    label: "Product name A-Z",
    value: "product-name-az",
  },
  {
    label: "Product name Z-A",
    value: "product-name-za",
  },
  {
    label: "Price Low to High",
    value: "price-low-to-high",
  },
  {
    label: "Price High to Low",
    value: "price-high-to-low",
  },
  {
    label: "AWP Low to High",
    value: "awp-low-to-high",
  },
  {
    label: "AWP High to Low",
    value: "awp-high-to-low",
  },
];

const RenderProduct = ({ products }) => {
  return products?.length ? (
    products?.map((product, i) => (
      <Grid key={i} item xs={12} sm={12 / 2} md={12 / 3}>
        <ProductCard product={product} />
      </Grid>
    ))
  ) : (
    <Grid item xs={12} height="643px" component={Stack} justifyContent="center" alignItems="center">
      <NoItemsIllustration />
    </Grid>
  );
};
