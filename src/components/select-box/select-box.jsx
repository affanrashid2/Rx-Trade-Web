"use client";

import React, { useState, useEffect } from "react";

import { InputLabel, FormControl, Select, MenuItem, FormHelperText, Box, useMediaQuery, CircularProgress, Stack } from "@mui/material";

import Utils from "../../utils/utils";

export default function SelectBox({
  labelTop,
  label,
  items = [],
  error = "",
  value: propsValue,
  styles = {},
  size,
  name = "",
  onChange: propsOnChange,
  helperText,
  labelSx,
  defaultValue,
  isLoading,
  fullWidth = true,
  optionRenderKeys,
  color,
  ...props
}) {
  const [stateValue, setStateValue] = React.useState("");
  const value = propsValue !== undefined ? propsValue : stateValue;

  const matches = useMediaQuery("(min-width:600px)");

  const adjustSize = size ? size : matches ? "large" : "small";

  const onChange = (event) => {
    if (propsOnChange) {
      propsOnChange(event);
    } else {
      setStateValue(event.target.value);
    }
  };

  const _id = `select__${Utils.generateId()}`;

  return (
    <Box sx={{ ...styles }}>
      {labelTop && (
        <InputLabel
          htmlFor={_id}
          sx={{
            marginBottom: "5px",
            color: "#000",
            ...labelSx,
          }}
        >
          {labelTop}
        </InputLabel>
      )}
      <FormControl {...props} size={adjustSize} fullWidth>
        {label && (
          <InputLabel id={_id} sx={{ backgroundColor: color, color: error ? "#d32f2f" : "black" }}>
            {label}
          </InputLabel>
        )}
        <Select id={_id} name={name} error={Boolean(error !== "")} value={value} onChange={onChange} defaultValue={defaultValue}>
          {items?.map((_v, _i) => {
            return (
              <MenuItem key={_i} value={_v[optionRenderKeys?.value]}>
                {_v[optionRenderKeys?.name]}
              </MenuItem>
            );
          })}

          {isLoading && (
            <Stack justifyContent="center" alignItems="center" width="100%" p={1}>
              <CircularProgress />
            </Stack>
          )}
        </Select>
      </FormControl>
      {error !== "" && <FormHelperText sx={{ color: "#d32f2f", mt: "0 !important" }}>{error}</FormHelperText>}
      {helperText && error === "" && <FormHelperText sx={{ mt: "0 !important" }}>{helperText}</FormHelperText>}
    </Box>
  );
}
