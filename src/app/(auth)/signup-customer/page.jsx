"use client";

import React, { useEffect, useState } from "react";

import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { ImagePicker, InputField, PasswordInput, SelectBox } from "@/components";
import { TOKEN_KEY } from "@/global";
import ApiManager from "@/helper/api-manager";
import errorsSetter from "@/helper/error-setter";
import { handleLoader, setToast, setUser } from "@/store/reducer";

const SignUpCustomer = () => {
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [isAddressSame, setIsAddressSame] = useState(false);
  const [formData, setFormData] = useState({
    heardFrom: [],
    licenseType: "hin",
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { value, name, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedHeardFrom = checked ? [...(prev.heardFrom || []), value] : (prev.heardFrom || []).filter((item) => item !== value);

        return {
          ...prev,
          heardFrom: updatedHeardFrom,
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (isAddressSame !== null) {
      if (isAddressSame) {
        setFormData((prev) => ({
          ...prev,
          billingAddressCity: formData?.city,
          billingAddressPostalCode: formData?.postalCode,
          billingAddressState: formData?.state,
          billingAddressStreet: formData?.street,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          billingAddressCity: formData?.billingAddressCity,
          billingAddressPostalCode: formData?.billingAddressPostalCode,
          billingAddressState: formData?.billingAddressState,
          billingAddressStreet: formData?.billingAddressStreet,
        }));
      }
    }
  }, [isAddressSame, formData?.city, formData?.postalCode, formData?.state, formData?.street]);

  const handleSignUpCustomer = async (e) => {
    e.preventDefault();
    try {
      if (!termsAndConditions) {
        dispatch(setToast({ type: "error", message: "Accept Terms and conditions to proceed" }));
        return;
      }
      dispatch(handleLoader(true));
      let { data } = await ApiManager("post", "auths/customers/signup", formData, "multipart/form-data");
      localStorage.setItem(TOKEN_KEY, data?.response?.accessToken);
      dispatch(setUser(data?.response?.details));
      setFormErrors({});

      dispatch(setToast({ type: "success", message: data?.message }));
    } catch (error) {
      if (error?.response?.status === 422) {
        setFormErrors(errorsSetter(error));
      } else {
        dispatch(setToast({ type: "error", message: error?.message }));
      }
    } finally {
      dispatch(handleLoader(false));
    }
  };

  return (
    <Box py={3} component="form" sx={{ px: { sm: 0, lg: 7 } }} onSubmit={handleSignUpCustomer}>
      <Stack gap={2}>
        <Typography variant="h6" fontWeight="bold" color="text.lightGrey">
          Customer
        </Typography>
        <Typography fontWeight="SemiBold" color="text.heading" variant="h4">
          Sign Up
        </Typography>
      </Stack>

      {/* -----------DEA Section --------------- */}

      <Stack gap={1.5} mt={3}>
        <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
          Username
        </Typography>
        <Typography fontWeight="Medium">Please Enter your DEA License Number</Typography>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              onClick={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  licenseType: e.target.checked ? "hin" : "dea",
                }));
              }}
            />
          }
          label="I don't have a DEA, I will provide my HIN instead"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label={formData?.licenseType === "dea" ? "DEA License Number" : "HIN License Number"}
              placeholder={formData?.licenseType === "dea" ? "DEA License Number" : "HIN License Number"}
              name="licenseNumber"
              value={formData?.licenseNumber}
              error={formErrors?.licenseNumber}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Stack>

      {/*-------------Password Section --------- */}

      <Stack gap={1.5} mt={3}>
        <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
          Password
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PasswordInput
              required
              label="Password"
              placeholder="Password"
              name="password"
              value={formData?.password}
              error={formErrors?.password}
              onChange={handleInputChange}
            />
            {/* <InputField
              required
              label="Password"
              placeholder="Password"
              name="password"
              value={formData?.password}
              error={formErrors?.password}
              onChange={handleInputChange}
            /> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData?.confirmPassword}
              error={formErrors?.confirmPassword}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Stack>

      {/*-------------Contact Information --------- */}

      <Stack gap={1.5} mt={3}>
        <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
          Contact Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label="Enter Email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInputChange}
              value={formData?.email}
              error={formErrors?.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <FormattedInputs 
             textMask="000-000-0000"
            label="Enter Phone Number"
            placeholder="Enter Phone Number"
            name="phoneNumber"
            value={formData?.phoneNumber}
            error={formErrors?.phoneNumber}
            onChange={handleInputChange}
            /> */}
            <InputField
              required
              label="Enter Phone Number"
              placeholder="Enter Phone Number"
              type="number"
              name="phoneNumber"
              value={formData?.phoneNumber}
              error={formErrors?.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Stack>
      {/*-------------Other Information  --------- */}

      <Stack gap={1.5} mt={3}>
        <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
          Business Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label="Name"
              placeholder="Enter Name"
              name="name"
              value={formData?.name}
              error={formErrors?.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label="Business Trade Name"
              placeholder="Business Trade Name"
              name="tradeName"
              value={formData?.tradeName}
              error={formErrors?.tradeName}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Stack>
      {/*-------------Shipping Information  --------- */}

      <Stack gap={1.5} mt={3}>
        <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
          Shipping Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label="Street Address"
              placeholder="Enter Address"
              name="street"
              value={formData?.street}
              error={formErrors?.street}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label="City"
              placeholder="City"
              name="city"
              value={formData?.city}
              error={formErrors?.city}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <InputField
              required
              label="State"
              placeholder="State"
              name="state"
              value={formData?.state}
              error={formErrors?.state}
              onChange={handleInputChange}
            /> */}
            <SelectBox
              items={states}
              placeholder="State"
              label="State*"
              name="state"
              optionRenderKeys={{
                name: "label",
                value: "value",
              }}
              color="#fff"
              value={formData?.state}
              error={formErrors?.state}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label="Postal Code"
              placeholder="Postal Code"
              name="postalCode"
              value={formData?.postalCode}
              error={formErrors?.postalCode}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Stack>
      {/*-------------Billing Information  --------- */}

      <Stack gap={1.5} mt={3}>
        <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
          Billing Information
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => {
                setIsAddressSame(e.target.checked);
              }}
            />
          }
          label="Check if Billing Address is same as Shipping Address"
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label="Street Address"
              placeholder="Enter Address"
              name="billingAddressStreet"
              value={formData?.billingAddressStreet}
              error={formErrors?.billingAddressStreet}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label="City"
              placeholder="City"
              name="billingAddressCity"
              value={formData?.billingAddressCity}
              error={formErrors?.billingAddressCity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <InputField
              required
              label="State"
              placeholder="State"
              name="billingAddressState"
              value={formData?.billingAddressState}
              error={formErrors?.billingAddressState}
              onChange={handleInputChange}
            /> */}
            <SelectBox
              items={states}
              placeholder="State"
              label="State*"
              name="billingAddressState"
              optionRenderKeys={{
                name: "label",
                value: "value",
              }}
              color="#fff"
              value={formData?.billingAddressState}
              error={formErrors?.billingAddressState}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label="Postal Code"
              placeholder="Postal Code"
              name="billingAddressPostalCode"
              value={formData?.billingAddressPostalCode}
              error={formErrors?.billingAddressPostalCode}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Stack>

      {/*-------------Other Information  --------- */}

      <Stack gap={1.5} mt={3}>
        <Typography fontWeight="Medium" variant="body1">
          Attach Your DEA License
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ImagePicker
              type="pdf"
              error={formErrors?.licensePhoto}
              onImageSelect={(img) => {
                setFormData((prev) => ({
                  ...prev,
                  licensePhoto: img[0]?.file,
                }));
              }}
            />
          </Grid>
        </Grid>
      </Stack>

      {/* ------How did you hear about us?------- */}

      <Stack gap={1.5} mt={3}>
        <Typography fontWeight="Medium" variant="body1">
          How did you hear about us?
        </Typography>
        <Stack direction="row" component={FormGroup} gap={{ xs: 2, lg: 4 }} flexWrap="wrap">
          {["email", "conference", "mail", "google", "peers"].map((label) => (
            <FormControlLabel
              sx={{ userSelect: "none" }}
              key={label}
              control={<Checkbox checked={formData?.heardFrom?.includes(label)} onChange={handleInputChange} name="heardFrom" value={label} />}
              label={label?.toUpperCase()}
            />
          ))}
        </Stack>
      </Stack>

      <Stack gap={1.5} mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputField
              required
              label="Signer Name"
              placeholder="Signer Name"
              name="signerName"
              value={formData?.signerName}
              error={formErrors?.signerName}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Stack>
      <FormControlLabel
        sx={{ mt: 3, width: 1 }}
        control={
          <Checkbox
            checked={termsAndConditions}
            onChange={(e) => {
              setTermsAndConditions(e.target.checked);
            }}
          />
        }
        label={
          <Typography component="span">
            I have read and agree to the{" "}
            <Typography component={Link} href="/terms-and-conditions" color="primary" fontWeight="SemiBold" sx={{ display: "inline" }}>
              Terms and Conditions
            </Typography>
          </Typography>
        }
      />

      <Box sx={{ maxWidth: "552px", margin: "50px auto" }}>
        <Button variant="contained" fullWidth size="large" type="submit">
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpCustomer;

const states = [
  { label: "Alabama", value: "alabama" },
  { label: "Alaska", value: "alaska" },
  { label: "Arizona", value: "arizona" },
  { label: "Arkansas", value: "arkansas" },
  { label: "California", value: "california" },
  { label: "Colorado", value: "colorado" },
  { label: "Connecticut", value: "connecticut" },
  { label: "Delaware", value: "delaware" },
  { label: "Florida", value: "florida" },
  { label: "Georgia", value: "georgia" },
  { label: "Hawaii", value: "hawaii" },
  { label: "Idaho", value: "idaho" },
  { label: "Illinois", value: "illinois" },
  { label: "Indiana", value: "indiana" },
  { label: "Iowa", value: "iowa" },
  { label: "Kansas", value: "kansas" },
  { label: "Kentucky", value: "kentucky" },
  { label: "Louisiana", value: "louisiana" },
  { label: "Maine", value: "maine" },
  { label: "Maryland", value: "maryland" },
  { label: "Massachusetts", value: "massachusetts" },
  { label: "Michigan", value: "michigan" },
  { label: "Minnesota", value: "minnesota" },
  { label: "Mississippi", value: "mississippi" },
  { label: "Missouri", value: "missouri" },
  { label: "Montana", value: "montana" },
  { label: "Nebraska", value: "nebraska" },
  { label: "Nevada", value: "nevada" },
  { label: "New Hampshire", value: "new_hampshire" },
  { label: "New Jersey", value: "new_jersey" },
  { label: "New Mexico", value: "new_mexico" },
  { label: "New York", value: "new_york" },
  { label: "North Carolina", value: "north_carolina" },
  { label: "North Dakota", value: "north_dakota" },
  { label: "Ohio", value: "ohio" },
  { label: "Oklahoma", value: "oklahoma" },
  { label: "Oregon", value: "oregon" },
  { label: "Pennsylvania", value: "pennsylvania" },
  { label: "Rhode Island", value: "rhode_island" },
  { label: "South Carolina", value: "south_carolina" },
  { label: "South Dakota", value: "south_dakota" },
  { label: "Tennessee", value: "tennessee" },
  { label: "Texas", value: "texas" },
  { label: "Utah", value: "utah" },
  { label: "Vermont", value: "vermont" },
  { label: "Virginia", value: "virginia" },
  { label: "Washington", value: "washington" },
  { label: "West Virginia", value: "west_virginia" },
  { label: "Wisconsin", value: "wisconsin" },
  { label: "Wyoming", value: "wyoming" },
];
