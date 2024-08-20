"use client";
import { useState, useEffect } from "react";

import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";

export default function SearchInputMultiSelect({
  apiUrl,
  label,
  callBack,
  setVendor,
  value,
  error,
  multiple = false,
  disabled = false,
  options = [],
  limitTags = 2,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState(options);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const getData = async () => {
    if (apiUrl && options.length === 0) {
      try {
        setIsLoading(true);
        const apiResponse = await ApiManager("get", apiUrl);
        setRecord(apiResponse?.data?.response?.details);
      } catch (error) {
        dispatch(
          setToast({
            type: "error",
            message: "Something Went Wrong",
          })
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (options.length > 0) {
      setRecord(options);
    } else {
      getData();
    }
  }, [options.length]);

  return (
    <Autocomplete
      disabled={disabled}
      multiple={multiple}
      limitTags={limitTags}
      options={record}
      size="small"
      ChipProps={{ color: "primary" }}
      getOptionLabel={(option) => option?.supplierName || option?.title || ""}
      open={open}
      onChange={(event, newValue) => {
        setVendor(newValue);
      }}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      value={value}
      loading={isLoading}
      onClose={() => setOpen(false)}
      onOpen={() => {
        if (options.length === 0) {
          getData();
        }
        setOpen(true);
      }}
      renderInput={(params) => <TextField {...params} label={label} error={Boolean(error)} helperText={error} />}
      {...props}
    />
  );
}
