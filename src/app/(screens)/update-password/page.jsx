"use client";
import React, { useState } from "react";

import { Box, Breadcrumbs, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { InputField, PasswordInput } from "@/components";
import ApiManager from "@/helper/api-manager";
import errorsSetter from "@/helper/error-setter";
import { handleLoader, setToast } from "@/store/reducer";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    setFormErrors({});
    dispatch(handleLoader(true));
    e.preventDefault();
    try {
      let { data } = await ApiManager("post", "auths/change-password", formData);

      dispatch(setToast({ type: "success", message: data?.message }));
      setFormErrors({});
      router.push("/");
    } catch (error) {
      if (error?.response?.status === 422) {
        setFormErrors(errorsSetter(error));
      } else {
        dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
      }
    } finally {
      dispatch(handleLoader(false));
    }
  };
  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,
    <Link key="2" color="inherit" href="/user-profile" onClick={() => {}}>
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        User Profile
      </Typography>
    </Link>,
    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      Update Password
    </Typography>,
  ];
  return (
    <Container maxWidth="lg">
      <Stack sx={{ py: 8, px: 6 }} gap={5} component="form" onSubmit={handleSubmit}>
        <Breadcrumbs separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <Stack>
          <Typography variant="h3" fontWeight="SemiBold" color="text.heading" gutterBottom>
            Update Password
          </Typography>

          <Stack gap={1.5} mt={3}>
            <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
              Password
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <PasswordInput
                  label="Enter Old Password"
                  placeholder="Enter Old Password"
                  name="oldPassword"
                  value={formData?.oldPassword}
                  required
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Stack>
          <Stack gap={1.5} mt={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <PasswordInput
                  label="Enter New Password"
                  placeholder="Enter New Password"
                  name="newPassword"
                  required
                  error={formErrors?.newPassword}
                  value={formData?.newPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PasswordInput
                  label="Re-Enter New Password"
                  placeholder="Re-Enter New Password"
                  name="confirmPassword"
                  required
                  error={formErrors?.confirmPassword}
                  value={formData?.confirmPassword}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Box sx={{ alignSelf: "center" }} width="40%">
          <Button fullWidth size="large" sx={{ p: 1.5, borderRadius: "8px" }} type="submit" variant="contained">
            Update Password
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default UpdatePassword;
