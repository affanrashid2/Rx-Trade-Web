"use client";

import { useState } from "react";

import { Box, Button, Checkbox, Divider, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { AppleLogo, FbLogo, GoogleLogo, PhoneLogo } from "@/assets";
import { InputField, SocialButton } from "@/components";
import ApiManager from "@/helper/api-manager";
import { handleLoader, setToast } from "@/store/reducer";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(handleLoader(true));
    try {
      let { data } = await ApiManager("post", "auths/forget-password", formData);

      router.push("/verify-otp");
      dispatch(setToast({ type: "success", message: data?.message }));
      localStorage.setItem("Email", formData?.email);
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
    } finally {
      dispatch(handleLoader(false));
    }
  };

  return (
    <Box width="100%" component="form" onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Enter Your Email
          </Typography>
          <Typography color="#8f8f8f" variant="body2">
            Use the email you used to create your account before.
          </Typography>
        </Stack>
        <InputField
          placeholder="Enter Email"
          label="Email"
          name="email"
          value={formData?.email}
          required
          type="email"
          onChange={(e) => {
            setFormData({
              email: e.target.value,
            });
          }}
        />
        <Button type="submit" variant="contained" sx={{ borderRadius: 1, mt: 1.5 }} size="large">
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default ForgotPassword;
