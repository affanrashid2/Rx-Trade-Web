"use client";
import React, { useEffect, useState } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  List,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { AlertDialog, CartItem, InputField, SelectBox } from "@/components";
import ApiManager from "@/helper/api-manager";
import errorsSetter from "@/helper/error-setter";
import { handleLoader, setToast } from "@/store/reducer";

const CheckOut = () => {
  const [cartItems, setCartItems] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [cardDetails, setCardDetails] = useState({});

  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const success = searchParams.get("success");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.appReducer);
  // const states = [
  //   { label: "Alabama", value: "alabama" },
  //   { label: "Alaska", value: "alaska" },
  //   { label: "Arizona", value: "arizona" },
  //   { label: "Arkansas", value: "arkansas" },
  //   { label: "California", value: "california" },
  //   { label: "Colorado", value: "colorado" },
  //   { label: "Connecticut", value: "connecticut" },
  //   { label: "Delaware", value: "delaware" },
  //   { label: "Florida", value: "florida" },
  //   { label: "Georgia", value: "georgia" },
  //   { label: "Hawaii", value: "hawaii" },
  //   { label: "Idaho", value: "idaho" },
  //   { label: "Illinois", value: "illinois" },
  //   { label: "Indiana", value: "indiana" },
  //   { label: "Iowa", value: "iowa" },
  //   { label: "Kansas", value: "kansas" },
  //   { label: "Kentucky", value: "kentucky" },
  //   { label: "Louisiana", value: "louisiana" },
  //   { label: "Maine", value: "maine" },
  //   { label: "Maryland", value: "maryland" },
  //   { label: "Massachusetts", value: "massachusetts" },
  //   { label: "Michigan", value: "michigan" },
  //   { label: "Minnesota", value: "minnesota" },
  //   { label: "Mississippi", value: "mississippi" },
  //   { label: "Missouri", value: "missouri" },
  //   { label: "Montana", value: "montana" },
  //   { label: "Nebraska", value: "nebraska" },
  //   { label: "Nevada", value: "nevada" },
  //   { label: "New Hampshire", value: "new_hampshire" },
  //   { label: "New Jersey", value: "new_jersey" },
  //   { label: "New Mexico", value: "new_mexico" },
  //   { label: "New York", value: "new_york" },
  //   { label: "North Carolina", value: "north_carolina" },
  //   { label: "North Dakota", value: "north_dakota" },
  //   { label: "Ohio", value: "ohio" },
  //   { label: "Oklahoma", value: "oklahoma" },
  //   { label: "Oregon", value: "oregon" },
  //   { label: "Pennsylvania", value: "pennsylvania" },
  //   { label: "Rhode Island", value: "rhode_island" },
  //   { label: "South Carolina", value: "south_carolina" },
  //   { label: "South Dakota", value: "south_dakota" },
  //   { label: "Tennessee", value: "tennessee" },
  //   { label: "Texas", value: "texas" },
  //   { label: "Utah", value: "utah" },
  //   { label: "Vermont", value: "vermont" },
  //   { label: "Virginia", value: "virginia" },
  //   { label: "Washington", value: "washington" },
  //   { label: "West Virginia", value: "west_virginia" },
  //   { label: "Wisconsin", value: "wisconsin" },
  //   { label: "Wyoming", value: "wyoming" },
  // ];

  const handleInputChange = (e) => {
    let { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getCard = async () => {
    dispatch(handleLoader(true));
    const { data } = await ApiManager("get", "cards");
    try {
      setCardDetails(data?.response?.details);
      setFormData((prev) => ({
        ...prev,
        cardNumber: !!data?.response?.details?.length && data?.response?.details?.[0]?.last4,
      }));
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.message }));
    } finally {
      dispatch(handleLoader(false));
    }
  };

  const addCard = async () => {
    try {
      const { data } = await ApiManager("post", "cards", {
        successUrl: `${window.location.origin}/checkout`,
      });

      window.location.href = data?.response?.details?.redirectTo;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        tradeName: user?.tradeName,
        phoneNumber: user?.phoneNumber,
      }));
    }
    getCard();
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    const { cardNumber, ...remainingData } = formData;
    if (cardNumber) {
      dispatch(handleLoader(true));
      try {
        let { data } = await ApiManager("post", "orders", remainingData);
        window.location.href = data?.response?.details?.redirectTo;
        dispatch(setToast({ type: "success", message: data?.message }));
        setFormErrors({});
      } catch (error) {
        if (error?.response?.status === 422) {
          setFormErrors(errorsSetter(error));
        } else {
          dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
        }
      } finally {
        dispatch(handleLoader(false));
      }
    } else {
      dispatch(setToast({ type: "error", message: "Card is Required" }));
    }
  };

  const confirmOrder = async () => {
    dispatch(handleLoader(true));
    try {
      let { data } = await ApiManager("patch", "orders", {
        sessionId,
        success,
      });
      dispatch(setToast({ type: "success", message: data?.message }));
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
    } finally {
      dispatch(handleLoader(false));
    }
  };

  useEffect(() => {
    if (success) {
      confirmOrder();
    }
  }, [success, sessionId]);

  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,
    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      Checkout
    </Typography>,
  ];

  return (
    <Container maxWidth="lg">
      <Stack gap={3} py={8} component="form" onSubmit={handleOrder}>
        <Breadcrumbs separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <Typography variant="h3" fontWeight="SemiBold" color="text.heading">
          Checkout
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack gap={3} height={1}>
              <Card
                component={Stack}
                gap={3}
                p={3}
                sx={{
                  border: "2px solid var(--Light-Grey, #C4C4C4)",
                  boxShadow: "none",
                  borderRadius: "7px",
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="text.heading">
                  General Information
                </Typography>
                <InputField
                  size="small"
                  label="Trade Name"
                  name="tradeName"
                  onChange={handleInputChange}
                  value={formData?.tradeName}
                  error={formErrors?.tradeName}
                  sx={{ borderRadius: "2px", outline: "none" }}
                  required
                />
                <InputField
                  size="small"
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  error={formErrors?.phoneNumber}
                  value={formData?.phoneNumber}
                  required
                />
                <InputField
                  size="small"
                  disabled
                  label="Card Number"
                  name="cardNumber"
                  onChange={handleInputChange}
                  error={formErrors?.cardNumber}
                  value={formData?.cardNumber ? `************${formData?.cardNumber}` : ""}
                />
                {formData?.cardNumber ? (
                  <></>
                ) : (
                  <Button sx={{ alignSelf: "flex-end" }} onClick={addCard} variant="contained">
                    Add Card
                  </Button>
                )}
              </Card>

              <Card
                component={Stack}
                gap={3}
                p={3}
                sx={{
                  border: "2px solid var(--Light-Grey, #C4C4C4)",
                  boxShadow: "none",
                  borderRadius: "7px",
                  flexGrow: 1,
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="text.heading">
                  Notes
                </Typography>
                <InputField multiline value={formData?.notes} name="notes" onChange={handleInputChange} label="Notes" minRows={2} />
              </Card>
              <Button variant="contained" onClick={handleOrder}>
                Next
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default CheckOut;
