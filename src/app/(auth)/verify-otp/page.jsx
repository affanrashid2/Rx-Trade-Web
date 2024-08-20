"use client";

// import {
//     AppleLogo,
//     ArrowForwardOutlinedIcon,
//     FbLogo,
//     GoogleLogo,
//     PhoneLogo,
// } from "@/assets";
import { useEffect, useState } from "react";

import { Box, Button, Checkbox, Divider, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { InputField, SocialButton } from "@/components";
import ApiManager from "@/helper/api-manager";
import { handleLoader, setToast } from "@/store/reducer";

const VerifyOtp = () => {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    dispatch(handleLoader(true));
    e.preventDefault();

    try {
      let { data } = await ApiManager("post", "auths/verify-otp", formData);
      localStorage.setItem("otp", formData?.otpCode);
      router.push("/reset-password");
      dispatch(setToast({ type: "success", message: data?.message }));
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.response?.data?.message }));
    } finally {
      dispatch(handleLoader(false));
    }
  };
  useEffect(() => {
    let email = localStorage.getItem("Email");
    if (email) {
      setFormData((prev) => ({
        ...prev,
        email: email,
      }));
    }
  }, []);

  return (
    <Box width="100%" component="form" onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Stack gap={1}>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Verification Code
          </Typography>
          <Typography color="#8f8f8f" variant="body2">
            We have sent the verification code to your email
          </Typography>
        </Stack>
        <InputField
          placeholder="Enter OTP"
          label="Enter OTP"
          name="otpCode"
          variant="standard"
          value={formData?.otpCode}
          type="number"
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              otpCode: e.target.value,
            }));
          }}
          // helperText={
          //     <Typography sx={{ my: 0.5 }} component="span">
          //         Did not receive the code?{" "}
          //         <Typography component="span" color="secondary">
          //             Resend{" "}
          //             {<ArrowForwardOutlinedIcon sx={{ color: "secondary" }} />}
          //         </Typography>
          //     </Typography>
          // }
        />
        <Button type="submit" variant="contained" sx={{ borderRadius: 1, mt: 1.5 }} size="large">
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default VerifyOtp;
