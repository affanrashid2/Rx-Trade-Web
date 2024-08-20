"use client";
import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { ExpandMoreIcon, ImgNotFound, InfoIcon, Medicine } from "@/assets";
import { NoItemsIllustration } from "@/components";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";
import Utils from "@/utils/utils";

const ManagePurchase = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const getAllOrders = async () => {
    setLoading(true);
    try {
      const { data } = await ApiManager("get", `orders?page=${page}&perPage=10`);
      setOrders(data?.response?.details);
      setTotalPages(data?.response?.totalPages);
    } catch (error) {
      dispatch(setToast({ type: "error", message: "Something Went Wrong" }));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, [page]);
  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,
    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      Manage Purchases
    </Typography>,
  ];
  return (
    <Container maxWidth="lg">
      <Stack py={8} gap={3}>
        <Breadcrumbs separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <Typography variant="h3" fontWeight="600" color="text.primary" gutterBottom>
          Manage Purchase
        </Typography>
        <Grid container spacing={2}>
          {loading ? (
            Array(10)
              .fill()
              .map((_, i) => {
                return (
                  <Grid key={i} item xs={12} md={6}>
                    <Skeleton height="40px" />
                  </Grid>
                );
              })
          ) : orders?.length ? (
            orders.map((order, i) => {
              return (
                <Grid key={i} item xs={12} md={6}>
                  <Products order={order} title={`Order Number #${order?._id}`} />
                </Grid>
              );
            })
          ) : (
            <NoItemsIllustration text="No Orders Found" />
          )}
        </Grid>
        {orders?.length && totalPages > 1 ? (
          <Pagination count={totalPages} sx={{ mx: "auto", my: 5 }} color="primary" onChange={(_, value) => setPage(value)} />
        ) : (
          ""
        )}
      </Stack>
    </Container>
  );
};

export default ManagePurchase;

const Products = ({ title, order }) => {
  const isXsScreen = useMediaQuery("(max-width:600px)");
  const date = moment.utc(order?.created_at);
  const formattedDate = date.format("DD/MM/YYYY");
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" justifyContent="space-between" width={1}>
          <Typography fontWeight="medium"> {title}</Typography>
          <Typography color="text.darkGrey"> {formattedDate}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={2}>
          <Stack gap={1}>
            <Stack px={1} gap={2} justifyContent="flex-end" alignItems="center">
              <Button sx={{ alignSelf: "flex-end" }} variant="contained" LinkComponent={Link} href={`manage-purchase/order/${order?._id}`}>
                Order Detail
              </Button>
            </Stack>
            <Divider />
            <Typography variant="h6" fontWeight="SemiBold" sx={{ alignSelf: "flex-start" }}>
              Supplier Name
            </Typography>
          </Stack>
          {order?.orderVendors?.map((vendor) => {
            return (
              <Accordion key={vendor?._id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                  <Stack direction="row" width="100%" justifyContent="space-between">
                    <Typography variant="body1" fontWeight="SemiBold">
                      {vendor?.vendorId?.supplierName}
                    </Typography>
                    <Stack gap={1} direction="row">
                      {/* <Chip label={vendor?.orderStatus} color={
                      vendor?.orderStatus === 'paid' ? 'success':'info'
                    } /> */}
                      <Chip
                        label={vendor?.paymentStatus}
                        sx={{
                          fontWeight: "medium",
                          textTransform: "capitalize",
                          "& .MuiChip-label": {
                            color: "white",
                          },
                        }}
                        size="small"
                        color={statusColorMap[vendor?.paymentStatus] || "default"}
                      />
                      <Chip
                        label={vendor?.orderStatus}
                        sx={{
                          fontWeight: "medium",
                          textTransform: "capitalize",
                          "& .MuiChip-label": {
                            color: "white",
                          },
                        }}
                        color={statusColorMap[vendor?.orderStatus] || "default"}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </AccordionSummary>
                {vendor?.products?.map((product) => {
                  return (
                    <AccordionDetails key={product?._id}>
                      <Stack direction={"row"} gap={2} width={1}>
                        <Box sx={{ height: 44, width: 50 }}>
                          {product?.photos?.length ? (
                            <Image
                              src={product?.photos[0]}
                              width={30}
                              height={30}
                              unoptimized
                              style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: "2px",
                              }}
                              alt=""
                            />
                          ) : (
                            <Image
                              src={ImgNotFound}
                              width={20}
                              height={20}
                              style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: "2px",
                              }}
                              alt=""
                            />
                          )}
                        </Box>
                        <Stack flexGrow={1}>
                          <Stack direction="row" justifyContent="space-between" flexGrow={1} alignItems="center">
                            <Stack>
                              <Typography variant="body1" fontWeight="Medium">
                                {product?.name}
                              </Typography>
                              <Typography color="grey" variant="subtitle2" fontWeight="regular">
                                {product?.quantity} x ${product?.totalPrice?.toFixed(2)}
                              </Typography>
                            </Stack>

                            <Typography variant="body1" fontWeight="Medium" color="text.heading">
                              ${product?.totalAmount?.toFixed(2)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </AccordionDetails>
                  );
                })}
              </Accordion>
            );
          })}

          {/* <Stack direction={'row'} gap={2} width={1}>
                        <Box sx={{ height: 44 }}>
                            <Image src={Medicine} style={{ height: '100%', width: '100%', borderRadius: "2px" }} alt="" />
                        </Box>
                        <Stack flexGrow={1} >
                            <Stack direction='row' justifyContent='space-between' flexGrow={1} alignItems='center'>
                                <Typography variant="body1" fontWeight='Medium'>Medicine 1</Typography>
                                <Typography variant="body1" fontWeight='Medium' color="text.heading">$99</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} gap={2} width={1}>
                        <Box sx={{ height: 44 }}>
                            <Image src={Medicine} style={{ height: '100%', width: '100%', borderRadius: "2px" }} alt="" />
                        </Box>
                        <Stack flexGrow={1} >
                            <Stack direction='row' justifyContent='space-between' flexGrow={1} alignItems='center'>
                                <Typography variant="body1" fontWeight='Medium'>Medicine 1</Typography>
                                <Typography variant="body1" fontWeight='Medium' color="text.heading">$99</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} gap={2} width={1}>
                        <Box sx={{ height: 44 }}>
                            <Image src={Medicine} style={{ height: '100%', width: '100%', borderRadius: "2px" }} alt="" />
                        </Box>
                        <Stack flexGrow={1} >
                            <Stack direction='row' justifyContent='space-between' flexGrow={1} alignItems='center'>
                                <Typography variant="body1" fontWeight='Medium'>Medicine 1</Typography>
                                <Typography variant="body1" fontWeight='Medium' color="text.heading">$99</Typography>
                            </Stack>
                        </Stack>
                    </Stack> */}

          <Divider sx={{ borderBottomWidth: "2px" }} />

          {order?.deductions?.length ? (
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.darkGrey" variant="body1" fontWeight="Medium">
                Sub Total
              </Typography>
              <Typography>{`$${order?.subTotal?.toFixed(2)}`}</Typography>
            </Stack>
          ) : (
            <></>
          )}
          {order?.deductions?.map((deduction) => (
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" gap={1}>
                <Typography color="text.darkGrey" variant="body1" fontWeight="Medium">
                  {deduction?.label}
                </Typography>
                <Tooltip
                  title={`Carts totaling less than $${deduction?.thresholdValue} are subject to a ${deduction?.type !== "percentage" ? `$` : ""}${deduction?.value}${deduction?.type === "percentage" ? `%` : ``} fee`}
                  placement={isXsScreen ? "bottom" : "right-start"}
                >
                  <InfoIcon
                    sx={{
                      color: "text.darkGrey",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </Stack>
              <Typography>${deduction?.calculatedAmount.toFixed(2)}</Typography>
            </Stack>
          ))}

          <Divider sx={{ borderBottomWidth: "2px" }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" fontWeight="SemiBold">
              Total
            </Typography>
            <Typography variant="h6" fontWeight="SemiBold">
              ${order?.total?.toFixed(2)}
            </Typography>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
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
