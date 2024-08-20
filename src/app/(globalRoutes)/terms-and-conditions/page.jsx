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
      Terms and Conditions
    </Typography>,
  ];
  return (
    <Container maxWidth="lg">
      <Stack py={8} gap={3}>
        <Breadcrumbs separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <Typography variant="h3" fontWeight="SemiBold" color="text.heading">
          Terms and Conditions
        </Typography>
        <Typography>
          These Terms and Conditions "Terms" govern your access to and use of Rx Trade Solutions ("we," "our," "us") website {window.location.origin}{" "}
          (the "Site"). By accessing or using the Site, you agree to be bound by these Terms and our Privacy Policy. If you do not agree with these
          Terms or our Privacy Policy, please do not access or use the Site.
        </Typography>
        <Typography fontWeight="SemiBold">1. Use of the Site</Typography>
        a. Eligibility: You must be at least 18 years old and capable of entering into a legally binding agreement to use the Site. By using the Site,
        you represent and warrant that you meet these eligibility requirements. <br /> b. License: We grant you a limited, non-exclusive,
        non-transferable license to access and use the Site for your personal or business use. <br /> c. Prohibited Activities: You agree not to: -
        Use the Site for any illegal purpose or in violation of any laws. - Interfere with or disrupt the integrity or performance of the Site. -
        Attempt to gain unauthorized access to the Site or its related systems or networks.
        <Typography fontWeight="SemiBold">2. User Accounts</Typography>
        a. Registration: To access certain features of the Site, you may need to register for an account. You agree to provide accurate, current, and
        complete information during the registration process. <br /> b. Account Security: You are responsible for maintaining the confidentiality of
        your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access
        or use of your account.
        <Typography fontWeight="SemiBold">3. Transactions</Typography>
        a. Buyers and Sellers: Rx Trade Solutions acts as a platform connecting buyers and sellers of prescription medications. We are not a party to
        any transaction between buyers and sellers. <br /> b. Responsibility: Buyers and sellers are solely responsible for all aspects of
        transactions conducted through the Site, including the quality, safety, legality, and delivery of products.
        <Typography fontWeight="SemiBold">4. Intellectual Property</Typography>
        Ownership: All content and materials on the Site, including text, graphics, logos, and images, are the property of Rx Trade Solutions or its
        licensors and are protected by intellectual property laws. <br /> b. License: You may access and view the content on the Site solely for your
        personal, non-commercial use. You may not reproduce, distribute, modify, or create derivative works of any content without our express
        permission.
        <Typography fontWeight="SemiBold">5. Limitation of Liability</Typography>
        a. Disclaimer: The Site is provided on an "as is" and "as available" basis without warranties of any kind. We do not warrant that the Site
        will be uninterrupted, secure, or error-free. <br /> b. Limitation of Liability: In no event shall Rx Trade Solutions, its officers,
        directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related
        to your use of the Site.
        <Typography fontWeight="SemiBold">6. Modifications to Terms</Typography>
        We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the Site. Your continued use of
        the Site after changes are posted constitutes your acceptance of the revised Terms.
        <Typography fontWeight="SemiBold">7. Governing Law</Typography>
        These Terms shall be governed by and construed in accordance with the laws of INGHAM County, State of Michigan, without regard to its conflict of law
        principles.
        <Typography fontWeight="SemiBold">8. Contact Us</Typography>
        If you have any questions about these Terms, please contact us at: CustomerService@RxTradeSolutions.com
        {/* <Stack width={1} alignItems="center">
          <Stack direction="row" gap={3} width="40%">
            <Button fullWidth sx={{ backgroundColor: "#FFFFFF", px: 3 }}>
              Cancel
            </Button>
            <Button fullWidth sx={{ p: 2 }} variant="contained">
              Approve
            </Button>
          </Stack>
        </Stack> */}
      </Stack>
    </Container>
  );
};

export default TermsAndConditions;
