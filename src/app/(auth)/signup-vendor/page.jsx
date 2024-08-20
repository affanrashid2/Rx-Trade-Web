"use client";
import React, { useState } from "react";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { ImagePicker, InputField, SelectBox } from "@/components";
import { TOKEN_KEY } from "@/global";
import ApiManager from "@/helper/api-manager";
import errorsSetter from "@/helper/error-setter";
import { handleLoader, setUser } from "@/store/reducer";

const SignUpVendor = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(handleLoader(true));
    try {
      const { data } = await ApiManager("post", "auths/vendors/signup", formData, "multipart/form-data");
      localStorage.setItem(TOKEN_KEY, data?.response?.accessToken);
      dispatch(setUser(data?.response?.details));
    } catch (error) {
      setFormErrors(errorsSetter(error));
    } finally {
      dispatch(handleLoader(false));
    }
  };
  return (
    <Box py={3} sx={{ px: { sm: 0, lg: 7 } }} component="form" onSubmit={handleSignUp}>
      <Stack gap={2}>
        <Typography variant="h6" fontWeight="bold" color="text.lightGrey">
          Vendor
        </Typography>
        <Typography fontWeight="SemiBold" color="text.heading" variant="h4">
          Sign Up
        </Typography>
      </Stack>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Email"
            placeholder="Email"
            name="email"
            value={formData?.email}
            error={formErrors?.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Password"
            placeholder="password"
            name="password"
            value={formData?.password}
            error={formErrors?.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData?.confirmPassword}
            error={formErrors?.confirmPassword}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Supplier name"
            placeholder="Supplier name"
            name="supplierName"
            value={formData?.supplierName}
            error={formErrors?.supplierName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Supplier DBA if applicable"
            placeholder="Supplier DBA if applicable"
            name="supplierDBA"
            value={formData?.supplierDBA}
            error={formErrors?.supplierDBA}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Main contact name"
            placeholder="Main contact name"
            name="mainContactName"
            value={formData?.mainContactName}
            error={formErrors?.mainContactName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Main contact phone number"
            placeholder="Main contact phone number"
            name="mainContactPhone"
            value={formData?.mainContactPhone}
            error={formErrors?.mainContactPhone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Main contact email"
            placeholder="Main contact email"
            name="mainContactEmail"
            value={formData?.mainContactEmail}
            error={formErrors?.mainContactEmail}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Billing department name"
            placeholder="Billing department name"
            name="billingDepName"
            value={formData?.billingDepName}
            error={formErrors?.billingDepName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Billing dept phone number"
            placeholder="Billing dept phone number"
            name="billingDepPhone"
            value={formData?.billingDepPhone}
            error={formErrors?.billingDepPhone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Billing dept email"
            placeholder="Billing dept email"
            name="billingDepEmail"
            value={formData?.billingDepEmail}
            error={formErrors?.billingDepEmail}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Street Address"
            placeholder="Street Address"
            name="street"
            value={formData?.street}
            error={formErrors?.street}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Website"
            placeholder="Website"
            name="websiteUrl"
            value={formData?.websiteUrl}
            error={formErrors?.websiteUrl}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Zip code"
            placeholder="Zip code"
            name="zipCode"
            value={formData?.zipCode}
            error={formErrors?.zipCode}
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
          <InputField
            required
            label="State"
            placeholder="State"
            name="state"
            value={formData?.state}
            error={formErrors?.state}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Years in business"
            placeholder="Years in business"
            name="yearsInBusiness"
            value={formData?.yearsInBusiness}
            error={formErrors?.yearsInBusiness}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Manufacturer"
            placeholder="Manufacturer"
            name="manufacturer"
            value={formData?.manufacturer}
            error={formErrors?.manufacturer}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="DEA License Number"
            placeholder="DEA License Number"
            name="licenseNumber"
            value={formData?.licenseNumber}
            error={formErrors?.licenseNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            required
            label="Wholesale License Number"
            placeholder="Wholesale License Number"
            name="wholeSaleLicenseNumber"
            value={formData?.wholeSaleLicenseNumber}
            error={formErrors?.wholeSaleLicenseNumber}
            type="number"
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SelectBoxWithTitle
            title="Do you offer Generics?"
            items={optionsYesNo}
            optionRenderKeys={{
              name: "label",
              value: "value",
            }}
            name="isGenerics"
            value={formData?.isGenerics}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectBoxWithTitle
            title="Do you offer Brands"
            items={optionsYesNo}
            optionRenderKeys={{
              name: "label",
              value: "value",
            }}
            name="isBrands"
            value={formData?.isBrands}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectBoxWithTitle
            title="Do you offer OTCs?"
            items={optionsYesNo}
            optionRenderKeys={{
              name: "label",
              value: "value",
            }}
            name="isOTC"
            value={formData?.isOTC}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectBoxWithTitle
            title="ADD-Accredited?"
            name="isAddAccredited"
            items={optionsYesNo}
            optionRenderKeys={{
              name: "label",
              value: "value",
            }}
            value={formData?.isAddAccredited}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectBoxWithTitle
            title="Do you buy Rx from Pharmacies to resell?"
            items={optionsYesNo}
            optionRenderKeys={{
              name: "label",
              value: "value",
            }}
            name="isBuyRxToResell"
            value={formData?.isBuyRxToResell}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectBoxWithTitle
            title="Are you able to provide Pedigree(T3) on all Rx purchases?"
            items={optionsYesNo}
            optionRenderKeys={{
              name: "label",
              value: "value",
            }}
            name="isPedigree"
            value={formData?.isPedigree}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectBoxWithTitle
            title="How will you load your catalog?"
            items={[
              {
                label: "API",
                value: "api",
              },
              {
                label: "EDI",
                value: "edi",
              },
              {
                label: "Manually",
                value: "manually",
              },
            ]}
            optionRenderKeys={{
              name: "label",
              value: "value",
            }}
            name="loadCatalogBy"
            value={formData?.loadCatalogBy}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={3}>
        <Grid item xs={12}>
          <InputField
            required
            labelTop="When was your last Inspection by the State, approximately?"
            name="lastInspection"
            value={formData?.lastInspection}
            onChange={handleInputChange}
            error={formErrors?.lastInspection}
            multiline
            minRows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            required
            labelTop="What licenses does your company hold? ( Wholesale, 3PL, Etc. - include details)"
            name="licenseCompanyHold"
            value={formData?.licenseCompanyHold}
            onChange={handleInputChange}
            error={formErrors?.licenseCompanyHold}
            multiline
            minRows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            required
            labelTop="Has your company had any citations and/or offenses on record? (If yes, please specify dates and occurrences) *"
            name="offensesCompanyHad"
            value={formData?.offensesCompanyHad}
            onChange={handleInputChange}
            error={formErrors?.offensesCompanyHad}
            multiline
            minRows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            required
            labelTop="the last 3 years has any officer or principal of the company been disciplined for any violation of laws pertaining to DCSCA or any healthcare governing body? (If yes, please provide details)"
            name="violationRecOfLast3Years"
            value={formData?.violationRecOfLast3Years}
            onChange={handleInputChange}
            error={formErrors?.violationRecOfLast3Years}
            multiline
            minRows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight="Medium" variant="body1" mb={1}>
            Photographs Needed of your Warehouse: Outside of Building, Customer Service Area, Warehouse Facility, & Shipping Area.
          </Typography>
          <ImagePicker
            onImageSelect={(img) => {
              setFormData((prev) => ({
                ...prev,
                areaPhotos: [...formData.areaPhotos, img?.file],
              }));
            }}
            error={formErrors?.areaPhotos}
          />
          <ImagePicker
            onImageSelect={(img) => {
              setFormData((prev) => ({
                ...prev,
                areaPhotos: [...formData.areaPhotos, img?.file],
              }));
            }}
            error={formErrors?.areaPhotos}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight="Medium" variant="body1" mb={1}>
            Copy of your last inspection by the board of pharmacy
          </Typography>
          <ImagePicker
            onImageSelect={(img) => {
              setFormData((prev) => ({
                ...prev,
                lastInspectionPhoto: img?.file,
              }));
            }}
            error={formErrors?.lastInspectionPhoto}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight="Medium" variant="body1" mb={1}>
            Attach your wholesale license
          </Typography>
          <ImagePicker
            onImageSelect={(img) => {
              setFormData((prev) => ({
                ...prev,
                wholesaleLicensePhoto: img?.file,
              }));
            }}
            error={formErrors?.wholesaleLicensePhoto}
          />
        </Grid>
        <Grid item xs={12} component={Stack} justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              borderRadius: "5px",
              my: 5,
              maxWidth: { xs: "unset", md: "552px" },
            }}
            type="submit"
          >
            Create Account
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpVendor;

const SelectBoxWithTitle = ({ title, ...props }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography>{title}</Typography>
      <SelectBox styles={{ minWidth: "126px" }} {...props} />
    </Stack>
  );
};

const optionsYesNo = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

const initialFormData = {
  isAddAccredited: false,
  isGenerics: false,
  isBrands: false,
  isOTC: false,
  isPedigree: false,
  loadCatalogBy: "api",
  isBuyRxToResell: false,
  areaPhotos: [],
};
