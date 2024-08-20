"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import debounce from "lodash.debounce";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutlineOutlinedIcon, InfoIcon } from "@/assets";
import { CartItem, Counter, TableWrapper } from "@/components";
import ApiManager from "@/helper/api-manager";
import { handleLoader, setToast } from "@/store/reducer";

function Cart() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [thLabels, setThLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMScreen = useMediaQuery("(max-width:600px)");
  const isXsScreen = useMediaQuery("(max-width:700px)");
  const isSmScreen = useMediaQuery("(max-width:830px)");
  const isMdScreen = useMediaQuery("(max-width:970px)");

  const { user } = useSelector((state) => state.appReducer);
  const router = useRouter();
  useEffect(() => {
    if (isMdScreen && !isSmScreen && !isXsScreen && !isMScreen) {
      // Medium screens but not small or extra-small

      setThLabels(["Product Image", "Product Name", "Manufacturer", "Expiration", "Quantity", "Product Price"]);
    } else if (isSmScreen && !isXsScreen && !isMScreen) {
      // Small screens but not extra-small

      setThLabels(["Product Image", "Product Name", "Manufacturer", "Quantity", "Product Price"]);
    } else if (isXsScreen && !isMScreen) {
      // Extra-small screens

      setThLabels(["Product Name", "Quantity", "Product Price"]);
    } else if (isMScreen) {
      // Default (large screens)
      setThLabels(["Product Name", "Product Price"]);
    } else {
      setThLabels(["Product Image", "NDC", "Product Name", "Manufacturer", "Expiration", "Quantity", "Product Price"]);
    }
  }, [isXsScreen, isSmScreen, isMdScreen, isMScreen]);

  // useEffect(() => {
  //   if (isMdScreen && !isSmScreen && !isXsScreen && !isMScreen) {
  //     // Medium screens but not small or extra-small
  //     setThLabels(["Product Image", "Product Name", "Expiration", "Quantity", "Product Price"]);
  //   } else if (isSmScreen && !isXsScreen && !isMScreen) {
  //     // Small screens but not extra-small
  //     setThLabels(["Product Image", "Product Name", "Quantity", "Product Price"]);
  //   } else if (isXsScreen && !isMScreen) {
  //     // Extra-small screens
  //     setThLabels(["Product Name", "Quantity", "Product Price"]);
  //   } else if (isMScreen) {
  //     // Default (large screens)
  //     setThLabels(["Product Name", "Product Price"]);
  //   } else {
  //     setThLabels(["Product Image", "NDC", "Product Name", "Manufacturer", "Expiration", "Quantity", "Product Price"]);
  //   }
  // }, [isXsScreen, isSmScreen, isMdScreen, isMScreen]);

  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,
    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      Cart
    </Typography>,
  ];
  const getCart = async () => {
    setIsLoading(true);
    dispatch(handleLoader(true));
    try {
      let { data } = await ApiManager("get", "carts");
      setCartItems(data?.response?.details);
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.message }));
    } finally {
      dispatch(handleLoader(false));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user.billingAddressStreet) {
      dispatch(setToast({ type: "error", message: "Please add billing and shipping information" }));
      router.push("/user-profile");
    } else {
      getCart();
    }
  }, []);
  return (
    <Container>
      <Stack gap={3} py={8}>
        <Breadcrumbs separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <Typography variant="h3" fontWeight="SemiBold" color="text.heading">
          Cart
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} gap={4}>
          <Paper sx={{ border: "2px solid var(--Light-Grey, #C4C4C4)", p: 2, width: "100%" }}>
            <Stack gap={1}>
              {isLoading ? (
                <Skeleton width="80%" />
              ) : (
                <Typography mb={1.5} fontWeight="bold" variant="h5">
                  Shipping Information
                </Typography>
              )}
              {isLoading ? (
                <>
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                </>
              ) : (
                <>
                  <Typography>
                    <span style={{ fontWeight: "700" }}>Company Name : </span>
                    {user?.tradeName}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "700" }}>Street Address : </span>
                    {user?.street}
                  </Typography>
                  <Typography>
                    {" "}
                    <span style={{ fontWeight: "700" }}>City :</span> {user?.city}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "700" }}>State :</span> {user?.state}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "700" }}>Postal Code :</span> {user?.postalCode}
                  </Typography>
                </>
              )}
            </Stack>
          </Paper>
          <Paper sx={{ p: 2, border: "2px solid var(--Light-Grey, #C4C4C4)", width: "100%" }}>
            <Stack gap={1}>
              {isLoading ? (
                <Skeleton width="80%" />
              ) : (
                <Typography mb={1.5} fontWeight="bold" variant="h5">
                  Billing Information
                </Typography>
              )}
              {isLoading ? (
                <>
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                </>
              ) : (
                <>
                  <Typography>
                    <span style={{ fontWeight: "700" }}>Company Name : </span>
                    {user?.tradeName}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "700" }}>Street Address : </span>
                    {user?.billingAddressStreet}
                  </Typography>
                  <Typography>
                    {" "}
                    <span style={{ fontWeight: "700" }}>City :</span> {user?.billingAddressCity}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "700" }}>State :</span> {user?.billingAddressState}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "700" }}>Postal Code :</span> {user?.billingAddressPostalCode}
                  </Typography>
                </>
              )}
            </Stack>
          </Paper>
        </Stack>
        <Paper sx={{ border: "2px solid var(--Light-Grey, #C4C4C4)" }}>
          <TableWrapper
            thContent={thLabels.map((value) => (
              <TableCell key={value} sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {value}
              </TableCell>
            ))}
            spanTd={thLabels.length}
            isContent={!!cartItems?.items?.length}
          >
            {cartItems?.items?.map((product) => {
              return <CartItem product={product} key={product?._id} getCart={getCart} setCartItems={setCartItems} />;
            })}
          </TableWrapper>

          {!!cartItems?.items?.length && (
            <Stack gap={2} p={4}>
              <Stack direction="row" width={1} justifyContent="space-between">
                {cartItems?.deductions?.length ? (
                  cartItems?.deductions?.map((item, i) => {
                    return (
                      <Stack direction="row" width="100%" key={i} justifyContent="space-between">
                        <Stack direction="row" gap={0.5}>
                          <Typography color="text.darkGrey" variant="body1" fontWeight="Medium">
                            {item?.label}
                          </Typography>
                          <Tooltip
                            title={`Carts totaling less than $${item?.thresholdValue} are subject to a ${item?.type !== "percentage" ? `$` : ""}${item?.value}${item?.type === "percentage" ? `%` : ``} fee`}
                            placement={isMScreen ? "bottom" : "right-start"}
                          >
                            <InfoIcon
                              sx={{
                                color: "text.darkGrey",
                                cursor: "pointer",
                              }}
                            />
                          </Tooltip>
                        </Stack>
                        <Typography>{`$${item?.amount?.toFixed(2)}`}</Typography>
                      </Stack>
                    );
                  })
                ) : (
                  <></>
                )}
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold" color="text.secondary">
                  Total
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="text.secondary">
                  {`$${cartItems?.finalTotal}`}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Paper>

        <Button disabled={!cartItems?.items?.length} LinkComponent={Link} href="/checkout" variant="contained">
          Checkout
        </Button>
      </Stack>
    </Container>
  );
}

export default Cart;
