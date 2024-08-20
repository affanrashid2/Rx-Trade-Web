"use client";

import React from "react";
import {
  Box,
  InputLabel,
  FormHelperText,
  TextField,
  useMediaQuery,
  FormControl,
} from "@mui/material";
import Utils from "@/utils/utils";

const InputField = React.forwardRef(
  (
    {
      labelTop = "",
      label = "",
      styles,
      error = "",
      helperText = "",
      icon,
      fullWidth = true,
      value: propsValue,
      onChange: propsOnChange,
      size,
      variant = "outlined",
      min = "",
      max = "",
      onBlur,
      ...props
    },
    ref
  ) => {
    const matches = useMediaQuery("(min-width:600px)");
    const [stateValue, setStateValue] = React.useState("");
    const value = propsValue !== undefined ? propsValue : stateValue;
    const _id = `myInput__${Utils.generateId()}`;
    const adjustSize = size ? size : matches ? "large" : "small";

    const onChange = (event) => {
      if (propsOnChange) {
        propsOnChange(event);
      } else {
        setStateValue(event.target.value);
      }
    };

    const printError = () => {
      if (error !== "") {
        return (
          <FormHelperText   sx={{  m: "0 !important" }}>
            {`${error}*`}
          </FormHelperText>
        );
      }
    };

    const printHelperText = () => {
      if (helperText !== "") {
        return (
          <FormHelperText
            sx={{
              mt: "0 !important",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#6C6A6A",
              fontWeight: 500,
            }}
          >
            {helperText}
            {icon}
          </FormHelperText>
        );
      }
    };

    return (
      <FormControl error={error} sx={{...styles, width:1 }}>
        {labelTop && (
          <InputLabel
            // htmlFor={_id}
            sx={{
              marginBottom: "5px",
              color: "#000",
              fontWeight: "Medium",
            }}
          >
            {labelTop}
          </InputLabel>
        )}
        <TextField
          id={_id}
          inputRef={ref}
          error={Boolean(error !== "")}
          label={label}
          variant={variant}
          fullWidth={fullWidth}
          //   size={size}
          size={adjustSize}
          autoComplete="off"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          inputProps={{
            min: min,
            max: max,
          }}
          {...props}
        />
        {printHelperText()}
        {printError()}
      </FormControl>
    );
  }
);

// Add displayName for the component
InputField.displayName = "InputField";

export default InputField;
