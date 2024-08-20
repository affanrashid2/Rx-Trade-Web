"use client";

import React, { useEffect, useState } from "react";

import { Box, Button, Card, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { MoreVertIcon } from "@/assets";
import { ProductList } from "@/components";
import ApiManager from "@/helper/api-manager";
import { handleLoader, setToast } from "@/store/reducer";

const OrderDetails = ({ params }) => {
  const [order, setOrder] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { orderId } = params;

  const confirmOrder = async () => {
    dispatch(handleLoader(true));
    try {
      let { data } = await ApiManager("get", `orders/${orderId}`);
      setOrder(data?.response?.details);
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
    } finally {
      dispatch(handleLoader(false));
    }
  };

  useEffect(() => {
    confirmOrder();
  }, []);

  const cancelOrder = async (order) => {
    dispatch(handleLoader(true));
    try {
      let { data } = await ApiManager("patch", "orders", {
        orderStatus: "cancelled",
        vendorId: order?.vendorId?._id,
        orderId: order?.orderId,
      });
      confirmOrder();
      dispatch(setToast({ type: "success", message: data?.message }));
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
    } finally {
      dispatch(handleLoader(false));
      setAnchorEl(null);
    }
  };

  return (
    <Container>
      <Typography variant="h3" my={3} fontWeight="SemiBold">
        Order Detail
      </Typography>
      <Card sx={{ p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="Trade Name" value={order?.tradeName} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="Date" value={moment(order?.created_at).format("DD-MM-YY | hh:mm A")} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="Phone Number" value={order?.phoneNumber} />
          </Grid>
          {order?.orderVendors?.map((vendor, i) => {
            if (vendor?.courierTrakingId) {
              return (
                <>
                  <Grid item xs={12} sm={6} md={4}>
                    <SingleDetail label="Tracking Number" value={vendor?.courierTrakingId} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <SingleDetail label="Courier Service" value={vendor?.courierName} />
                  </Grid>
                </>
              );
            }
          })}
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="SemiBold">
              Shipping Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="Address" value={order?.street} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="City" value={order?.city} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="Postal Code" value={order?.postalCode} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="State" value={order?.state} />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="SemiBold">
              Billing Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="Address" value={order?.billingAddressStreet} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="City" value={order?.billingAddressCity} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="Postal Code" value={order?.billingAddressPostalCode} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="State" value={order?.billingAddressState} />
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2}>
          {!!order?.deductions?.length && (
            <Grid item xs={12} sm={6} md={4}>
              <SingleDetail label="Sub Total " value={"$" + order?.subTotal} />
            </Grid>
          )}

          {order?.deductions?.map((deduction, i) => {
            return (
              <Grid key={i} item xs={12} sm={6} md={4}>
                {" "}
                <SingleDetail key={deduction?._id} label={deduction?.label} value={`$${deduction?.calculatedAmount?.toFixed(2)}`} />{" "}
              </Grid>
            );
          })}

          <Grid item xs={12} sm={6} md={4}>
            <SingleDetail label="Total" value={"$" + order?.total} />
          </Grid>
        </Grid>
        {/* <Stack gap={2}>
          <SingleDetail label="Trade Name" value={order?.tradeName} />
          <SingleDetail label="Address" value={order?.address} />
          <SingleDetail label="Date" value={moment(order?.created_at).format("DD-MM-YY | hh:mm A")} />
          <SingleDetail label="City" value={order?.city} />
          <SingleDetail label="Phone Number" value={order?.phoneNumber} />
          <SingleDetail label="Postal Code" value={order?.postalCode} />
          <SingleDetail label="Sub Total " value={"$" + order?.subTotal} />
          {order?.deductions?.map((deduction) => {
            return <SingleDetail key={deduction?._id} label={deduction?.label} value={`$${deduction?.calculatedAmount?.toFixed(2)}`} />;
          })}
          <SingleDetail label="Total" value={"$" + order?.total} />
        </Stack> */}
      </Card>

      <Stack gap={2} my={2}>
        <Typography variant="h4" fontWeight="SemiBold">
          Vendors
        </Typography>

        {order?.orderVendors?.map((vendor, i) => {
          return (
            <Card sx={{ p: 2, position: "relative" }} key={i}>
              <Stack gap={5}>
                <Box>
                  {vendor?.paymentStatus === "paid" && vendor?.orderStatus === "created" && (
                    <Button sx={{ position: "absolute", right: 10, top: 10 }} onClick={() => cancelOrder(vendor)}>
                      Cancel Order
                    </Button>
                  )}
                </Box>
                <Stack gap={2} mt={{ xs: 5, sm: 0 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                      {/* <SingleDetail
                  label="Vendor Name"
                  chip={vendor?.vendorId?.name}
                  direction="row"
                  /> */}
                      <Stack direction="row" gap={1}>
                        <Typography variant="body1" fontWeight="SemiBold">
                          Vendor Name:
                        </Typography>
                        <Typography variant="body1"> {vendor?.vendorId?.supplierName}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <SingleDetail label="Payment Status" chip={vendor?.paymentStatus} direction="row" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <SingleDetail label="Order Status" chip={vendor?.orderStatus} direction="row" />
                    </Grid>
                  </Grid>

                  <Stack gap={2}>
                    <SingleDetail label="Products" />
                    <Grid container spacing={2}>
                      {vendor?.products?.map((product) => {
                        return (
                          <Grid item xs={12} sm={6} md={4} key={product?._id}>
                            <ProductList product={product} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Stack>
                </Stack>
              </Stack>
              {/* <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem disabled={vendor?.orderStatus === "cancelled"} onClick={() => cancelOrder(vendor)}>
                  Cancel Order
                </MenuItem>
              </Menu> */}
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
};

export default OrderDetails;

const SingleDetail = ({ label, value, chip, direction }) => {
  return (
    <Stack direction={direction || "column"} gap={1} alignItems="flex-start">
      <Typography variant="body1" fontWeight="SemiBold">
        {label} :
      </Typography>
      {!chip && (
        <Typography variant="body1" textTransform="capitalize">
          {value}
        </Typography>
      )}
      {chip && <Chip label={chip} color={statusColorMap[chip]} size="small" sx={{ textTransform: "capitalize" }} />}
    </Stack>
  );
};

const statusColorMap = {
  paid: "success",
  processing: "info",
  refunded: "default",
  created: "info",
  cancelled: "default",
  delivered: "success",
  pending_refund: "default",
};
