"use client";
import React, { useEffect, useState } from "react";

import { Avatar, Box, Breadcrumbs, Button, Checkbox, Container, FormControlLabel, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Pdf } from "@/assets";
import { ImagePicker, InputField, SelectBox } from "@/components";
import ApiManager from "@/helper/api-manager";
import errorsSetter from "@/helper/error-setter";
import { handleLoader, setToast, setUser } from "@/store/reducer";

const UserProfile = () => {
  const { user } = useSelector((state) => state.appReducer);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(false);
  const [isAddressSame, setIsAddressSame] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    dispatch(handleLoader(true));
    e.preventDefault();
    let newData;
    if (image) {
      let {
        created_at,
        isDeleted,
        licenseNumber,
        licenseType,
        stripeChargesEnabled,
        heardFrom,
        stripeConnectStatus,
        otp,
        role,
        status,
        updated_at,
        stripeCustomerId,
        __v,
        _id,
        ...remainingData
      } = formData;
      newData = remainingData;
    } else {
      let {
        created_at,
        isDeleted,
        licenseNumber,
        licenseType,
        stripeConnectStatus,
        stripeChargesEnabled,
        heardFrom,
        licensePhoto,
        otp,
        role,
        status,
        updated_at,
        stripeCustomerId,
        __v,
        _id,
        ...remainingData
      } = formData;
      newData = remainingData;
    }

    try {
      let { data } = await ApiManager("patch", "auths/customers/update", newData, "multipart/form-data");
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

  useEffect(() => {
    setFormData(user);
    const lastInspectionImg = user?.licensePhoto?.split(".");
    if (lastInspectionImg?.length && lastInspectionImg[lastInspectionImg?.length - 1] === "pdf") {
      setImagePreview(Pdf.src);
    } else {
      setImagePreview(user?.licensePhoto);
    }
  }, [user]);

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

  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,

    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      Update Profile
    </Typography>,
  ];

  return (
    <Container maxWidth="lg">
      <Stack sx={{ py: 8, px: 6 }} gap={5} component="form" onSubmit={handleSubmit}>
        <Stack>
          <Breadcrumbs
            sx={{ my: 5 }}
            separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>}
            aria-label="breadcrumb"
          >
            {BreadCrumbs}
          </Breadcrumbs>
          <Typography variant="h3" fontWeight="SemiBold" color="text.heading" gutterBottom>
            Update Profile
          </Typography>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={2}>
            <Link href="/update-password">
              <Button variant="contained">Update Password</Button>
            </Link>
            <Link href="/card">
              <Button variant="contained">Change Card Information</Button>
            </Link>
          </Stack>
          <Stack gap={1.5} mt={3}>
            <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
              Business Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Name"
                  placeholder="Name"
                  name="name"
                  error={formErrors?.name}
                  required
                  value={formData?.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Signer Name"
                  placeholder="Signer Name"
                  name="signerName"
                  error={formErrors?.signerName}
                  required
                  value={formData?.signerName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Business Trade Name"
                  placeholder="Business Trade Name"
                  name="tradeName"
                  error={formErrors?.tradeName}
                  required
                  value={formData?.tradeName}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Stack>
          <Stack gap={1.5} mt={3}>
            <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Enter Email"
                  placeholder="Enter Email"
                  name="email"
                  error={formErrors?.email}
                  type="email"
                  required
                  value={formData?.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Enter Phone Number"
                  placeholder="Enter Phone Number"
                  type="number"
                  name="phoneNumber"
                  error={formErrors?.phoneNumber}
                  required
                  value={formData?.phoneNumber}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Stack>
          {/* <Stack gap={1.5} mt={3}>
            <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
              Other Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Business Trade Name"
                  placeholder="Business Trade Name"
                  name="tradeName"
                  error={formErrors?.tradeName}
                  required
                  value={formData?.tradeName}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Stack> */}

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
                <SelectBox
                  items={states}
                  placeholder="State"
                  label="State"
                  name="state"
                  optionRenderKeys={{
                    name: "label",
                    value: "value",
                  }}
                  color="#f6f7fb"
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
              sx={{ userSelect: "none" }}
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
                <SelectBox
                  items={states}
                  placeholder="State"
                  label="State"
                  name="billingAddressState"
                  optionRenderKeys={{
                    name: "label",
                    value: "value",
                  }}
                  color="#f6f7fb"
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
          <Stack gap={1.5} mt={3}>
            <Typography fontWeight="SemiBold" color="text.heading" sx={{ mb: 1 }} variant="h5">
              License Picture
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ImagePicker
                  type="pdf"
                  previewImage={imagePreview && encodeURI(imagePreview)}
                  onImageSelect={(img) => {
                    if (img) {
                      setImage(true);
                      setImagePreview(null);
                      setFormData((prev) => ({
                        ...prev,
                        licensePhoto: img[0]?.file,
                      }));
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Box sx={{ alignSelf: "center" }} width="40%">
          <Button fullWidth size="large" sx={{ p: 1.5, borderRadius: "8px" }} variant="contained" type="submit">
            Update Account
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default UserProfile;

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
