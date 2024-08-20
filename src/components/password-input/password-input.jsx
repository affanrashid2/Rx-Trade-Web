"use client";
import React, { useState } from "react";

import { IconButton, InputAdornment } from "@mui/material";

import { InputField } from "..";
import { Visibility, VisibilityOff } from "@/assets";

function PasswordInput(props) {
  const { value, error, onChange } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputField
      //   placeholder="Enter the Password"
      //   label="Enter the Password"
      //   variant="standard"
      //   name="password"
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={value}
      error={error}
      onChange={onChange}
    />
  );
}

export default PasswordInput;
