"use client";

import React, { useState } from "react";

import { Button, Checkbox, Divider, FormControlLabel, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { VisibilityOff, Visibility } from "@/assets";
import { InputField } from "@/components";
import { TOKEN_KEY } from "@/global";
import ApiManager from "@/helper/api-manager";
import errorsSetter from "@/helper/error-setter";
import { handleLoader, setToast, setUser } from "@/store/reducer";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(handleLoader(true));
      let { data } = await ApiManager("post", "auths/signin", {
        ...formData,
        role: "customer",
      });
      localStorage.setItem(TOKEN_KEY, data?.response?.accessToken);
      dispatch(setUser(data?.response?.details));
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
  };

  return (
    <Stack gap={4} width={1} component={"form"} onSubmit={handleLogin}>
      <Stack direction={{ xs: "column", lg: "row" }} justifyContent="space-between" gap={1}>
        <Button sx={Styles.button} variant="contained" component={Link} size="large" href="/signup-customer">
          Sign up As Customer
        </Button>
        <Button sx={Styles.button} component={"a"} variant="contained" size="large" href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/signup-vendor`}>
          Sign up As Vendor
        </Button>
      </Stack>
      <Typography sx={{ fontWeight: "bold" }} variant="h4">
        Login
      </Typography>

      <Stack spacing={2}>
        <InputField
          placeholder="Enter name"
          label="Email"
          name="email"
          type="email"
          value={formData?.email}
          onChange={handleInputChange}
          required
          error={formErrors?.email}
        />
        <InputField
          placeholder="Enter Password"
          label="Password"
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          required
          type={showPassword ? "text" : "password"}
          error={formErrors?.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack justifyContent="flex-end" direction={"row"}>
          {/* <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          /> */}
          <Button
            sx={{
              color: "#757575",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
            component={Link}
            href="/forgot-password"
          >
            Forgot Password?
          </Button>
        </Stack>
      </Stack>
      <Button variant="contained" sx={{ borderRadius: 1, mt: 1.5 }} size="large" type="submit">
        Login
      </Button>
      <Button sx={Styles.button} component={"a"} size="large" href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/login`}>
        Login As Vendor
      </Button>
    </Stack>
  );
};

export default Login;

const Styles = {
  button: {
    textTransform: "capitalize",
    width: 1,
    borderRadius: "8px",
  },
};
