"use client";
import React, { useState } from "react";

import { Breadcrumbs, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { InputField } from "@/components";
import ApiManager from "@/helper/api-manager";
import { handleLoader, setToast } from "@/store/reducer";

const ContactUs = () => {
  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,
    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      Contact Us
    </Typography>,
  ];
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    dispatch(handleLoader(true));
    e.preventDefault();
    try {
      const { data } = await ApiManager("post", "contact-us", formData);
      dispatch(setToast({ type: "success", message: data?.message }));
      router.push("/");
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.message }));
    } finally {
      dispatch(handleLoader(false));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg">
      <Stack gap={5} py={8}>
        <Breadcrumbs separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <Typography variant="h3" fontWeight="600" color="text.primary" gutterBottom>
          Contact Us
        </Typography>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={4}>
            <Stack
              sx={{
                backgroundColor: "primary.main",
                color: "#fff",
                borderRadius: "10px",
                p: 4,
              }}
              gap={5}
              alignItems="center"
            >
              <Typography >
                Lorem Ipsum Residences
                <br />
                1234 Dolor Sit Amet St.
                <br />
                Suite 567
                <br />
                Consectetur, Adipiscing Elit 89012
                <br />
                United States
              </Typography>
              <Stack>
                <Typography>
                  <Typography component="span" fontWeight="SemiBold">
                    Phone:{" "}
                  </Typography>
                  123 123 234
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight="SemiBold">
                    Email:{" "}
                  </Typography>
                  contact@loremipsum.com
                </Typography>
              </Stack>
              <Stack direction="row" gap={1.5}>
                <IconButton>
                  <FacebookOutlinedIcon
                    sx={{ color: "#fff", height: "36px", width: "36px" }}
                  />
                </IconButton>
                <IconButton>
                  <InstagramIcon
                    sx={{ color: "#fff", height: "36px", width: "36px" }}
                  />
                </IconButton>
                <IconButton>
                  <LinkedInIcon
                    sx={{ color: "#fff", height: "36px", width: "36px" }}
                  />
                </IconButton>
                <IconButton>
                  <TwitterIcon
                    sx={{ color: "#fff", height: "36px", width: "36px" }}
                  />
                  </IconButton>
                  </Stack>
            </Stack>
          </Grid> */}
          <Grid item xs={12}>
            <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
              <Grid item xs={12} md={6}>
                <InputField
                  label="First Name"
                  placeholder="First Name"
                  name="firstName"
                  value={formData?.firstName}
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Last Name"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData?.lastName}
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Company Name"
                  placeholder="Company Name"
                  name="companyName"
                  value={formData?.companyName}
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Phone Number"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  type="number"
                  value={formData?.phoneNumber}
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label="State/Region"
                  placeholder="State/Region Name"
                  name="stateRegion"
                  value={formData?.stateRegion}
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData?.email}
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              {/* <Grid item xs={12}  >
                <InputField
                  label="Call Date"
                  placeholder="Call Date"
                  name="callDate"
                  value={formData?.callDate}
                  required
                  onChange={handleInputChange}
                  />
              </Grid> */}
              <Grid item xs={12}>
                <InputField
                  multiline
                  minRows={3}
                  label="Message"
                  placeholder="Message"
                  name="message"
                  value={formData?.message}
                  required
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} component={Stack} justifyContent="center">
                <Button variant="contained" size="large" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default ContactUs;
