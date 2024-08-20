"use client";
import React from "react";

import { Breadcrumbs, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const TermsAndConditions = () => {
  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,

    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      Privacy Policy
    </Typography>,
  ];
  return (
    <Container maxWidth="lg">
      <Stack py={8} gap={4}>
        <Breadcrumbs separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <Typography variant="h3" fontWeight="SemiBold" color="text.heading">
          Privacy Policy
        </Typography>
        <Typography>
          Effective Date: June 27th, 2024 <br /> Rx Trade Solutions ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you visit our website {window?.location?.origin}, including any
          other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site"). Please read
          this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </Typography>
        <Stack gap={1/2}>
        <Typography fontWeight="SemiBold">1. Information We Collect</Typography>
        <Typography>
          We may collect personal information from you when you visit our Site, register an account, make a purchase, or communicate with us. This
          information may include: - **Personal Information:** Name, address, email address, phone number, payment information. - **Transaction
          Information:** Details about products or services you purchase or sell through our platform. - **Technical Information:** IP address,
          browser type, device information, cookies, usage data.
        </Typography>
        </Stack>
        <Stack gap={1/2}>
        <Typography fontWeight="SemiBold">2. How We Use Your Information</Typography>
        <Typography>
          We may use the information we collect in the following ways: - To facilitate transactions and provide our services. - To personalize user
          experience and improve our Site. - To communicate with you, including customer service inquiries. - To comply with legal obligations.
        </Typography>
        </Stack>
        <Stack gap={1/2}>
        <Typography fontWeight="SemiBold">3. Sharing Your Information</Typography>
        <Typography>
          We may share your information with third parties in the following circumstances: - With service providers who assist us in operating our
          website or conducting our business. - With vendors to facilitate transactions between buyers and sellers. - With legal authorities if
          required by law or to protect our rights.
        </Typography>
        </Stack>
        <Stack gap={1/2}>
        <Typography fontWeight="SemiBold">4. Security of Your Information</Typography>
        <Typography>
          We use reasonable security measures to protect the confidentiality of your personal information. However, no method of transmission over the
          internet or electronic storage is completely secure.
        </Typography>
        </Stack>
        <Stack gap={1/2}>
        <Typography fontWeight="SemiBold">5. Your Choices Regarding Your Information</Typography>
        <Typography>
          You may choose not to provide certain personal information, but this may limit your ability to use certain features of the Site.
        </Typography>
        </Stack>
        <Stack gap={1/2}>
        <Typography fontWeight="SemiBold">6. Changes to This Privacy Policy</Typography>
        <Typography>
          We may update this privacy policy from time to time. The updated version will be indicated by an updated "Effective Date" at the beginning
          of this policy.
        </Typography>
        </Stack>
        <Stack gap={1/2}>
        <Typography fontWeight="SemiBold">7. Contact Us</Typography>
        <Typography>If you have any questions about this privacy policy, please contact us at: Customerservice@RxTradeSolutions.com</Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default TermsAndConditions;
