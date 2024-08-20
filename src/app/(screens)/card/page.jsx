"use client";
import React, { useEffect, useState } from "react";

import { Box, Breadcrumbs, Button, Container, Divider, Grid, IconButton, Paper, Skeleton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { AddIcon, DeleteOutlineOutlinedIcon, KeyboardArrowRightIcon } from "../../../assets";
import { ConfirmationModal } from "@/components";
import ApiManager from "@/helper/api-manager";
import { handleLoader, setToast } from "@/store/reducer";

const CardPage = () => {
  const [cardDetails, setCardDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const getCard = async () => {
    setIsLoading(true);
    try {
      const { data } = await ApiManager("get", "cards");
      setCardDetails(data?.response?.details);
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
    } finally {
      setIsLoading(false);
    }
  };

  const addCard = async () => {
    dispatch(handleLoader(true));
    try {
      const { data } = await ApiManager("post", "cards", {
        successUrl: `${window.location.origin}/card`,
      });

      setCardDetails(data?.response?.details);
      window.location.href = data?.response?.details?.redirectTo;
    } catch (error) {
      dispatch(handleLoader(false));
      dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
    }
  };

  const handleDelete = async (id) => {
    dispatch(handleLoader(true));
    try {
      const { data } = await ApiManager("delete", `cards/${id}`);

      dispatch(setToast({ type: "success", message: data?.message }));
      getCard();
    } catch (error) {
      dispatch(handleLoader(false));
      dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
    } finally {
      dispatch(handleLoader(false));
      setOpen(false);
    }
  };

  useEffect(() => {
    getCard();
  }, []);
  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,
    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      Card
    </Typography>,
  ];

  return (
    <Container maxWidth="lg">
      <Stack gap={3} py={8}>
        <Breadcrumbs separator={<Typography variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <Typography variant="h3" fontWeight="SemiBold" color="text.heading">
          Card
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            {isLoading ? (
              <Paper elevation={1} sx={{ py: 1 }}>
                <Stack justifyContent="space-between" direction="row" px={2} py={1}>
                  <Skeleton width="70%" />
                  <Skeleton width="10%" />
                </Stack>
                <Divider sx={{ borderColor: "#e6e6e6" }} />
                <Stack sx={{ px: 2, py: 3, height: "100%" }} gap={2} justifyContent="space-between">
                  <Stack width={1} justifyContent="space-between" direction="row">
                    <Skeleton width="50%" />
                    <Skeleton width="30%" />
                  </Stack>
                  <Stack width={1} justifyContent="space-between" direction="row">
                    <Skeleton width="50%" />
                    <Skeleton width="30%" />
                  </Stack>
                  <Stack width={1} justifyContent="space-between" direction="row">
                    <Skeleton width="50%" />
                    <Skeleton width="30%" />
                  </Stack>
                </Stack>
              </Paper>
            ) : !cardDetails?.length ? (
              <Paper elevation={1} sx={{ py: 1 }}>
                <Stack justifyContent="space-between" direction="row" px={2} py={1}>
                  <Typography fontWeight="SemiBold">Credit Card</Typography>
                  <KeyboardArrowRightIcon />
                </Stack>
                <Divider sx={{ borderColor: "#e6e6e6" }} />
                <Stack sx={{ px: 2, py: 1, height: "100%" }} gap={1.5} justifyContent="space-between">
                  <Box
                    sx={{
                      border: "1px dashed black",
                      width: "fit-content",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={addCard}
                  >
                    <AddIcon />
                  </Box>
                  <Stack gap={1 / 2}>
                    <Typography fontWeight="bold" color="text.darkGrey">
                      Add a Card
                    </Typography>
                    <Typography>Please Add your Card</Typography>
                  </Stack>
                  <Button sx={{ width: { xs: "100%", sm: "45%", md: "40%" } }} variant="contained" component="a" onClick={addCard}>
                    Add Card
                  </Button>
                </Stack>
              </Paper>
            ) : (
              cardDetails.map((card, i) => (
                <Paper elevation={1} key={i} sx={{ py: 1 }}>
                  <Stack justifyContent="space-between" direction="row" px={2} py={1}>
                    <Typography fontWeight="SemiBold">Credit Card</Typography>
                    <IconButton
                      onClick={() => {
                        setDeleteId(card?.id);
                        setOpen(true);
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Stack>
                  <Divider sx={{ borderColor: "#e6e6e6" }} />
                  <Stack sx={{ px: 2, py: 3, height: "100%" }} gap={2} justifyContent="space-between">
                    <Stack width={1} justifyContent="space-between" direction="row">
                      <Typography>Card Type</Typography>
                      <Typography fontWeight="Medium" sx={{ textTransform: "capitalize" }}>
                        {card?.brand}
                      </Typography>
                    </Stack>
                    <Stack width={1} justifyContent="space-between" direction="row">
                      <Typography>Card Number</Typography>
                      <Typography fontWeight="Medium">{`************${card?.last4}`}</Typography>
                    </Stack>
                    <Stack width={1} justifyContent="space-between" direction="row">
                      <Typography>Expiry Date</Typography>
                      <Typography fontWeight="Medium">{`${card?.exp_month}/${card?.exp_year}`}</Typography>
                    </Stack>
                  </Stack>
                </Paper>
              ))
            )}
          </Grid>
        </Grid>
        <ConfirmationModal open={open} onClose={() => setOpen(false)} callBack={() => handleDelete(deleteId)} />
      </Stack>
    </Container>
  );
};

export default CardPage;

// let style = {
//   "&::-webkit-scrollbar": {
//     width: "7px",
//   },
//   "&::-webkit-scrollbar-track": {
//     background: "#f1f1f1",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     background: "#d4d4d4",
//     borderRadius: "4px",
//   },
// };
