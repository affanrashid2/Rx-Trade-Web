"use client";
import React from "react";

import { Breadcrumbs, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Faqs = () => {
  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,

    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      FAQs
    </Typography>,
  ];
  return (
    <Container maxWidth="lg">
      <Breadcrumbs
        sx={{ pt: 7, pb: 4 }}
        separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>}
        aria-label="breadcrumb"
      >
        {BreadCrumbs}
      </Breadcrumbs>
      <Typography variant="h3" fontWeight="SemiBold" color="text.heading">
        Frequently Asked Questions
      </Typography>
      <Stack py={5} gap={5}>
        <Stack gap={1 / 2}>
          <Typography variant="h6" fontWeight="SemiBold">
            What is RX Trade Solutions?
          </Typography>
          <Typography>
            RX Trade Solutions is a platform where pharmacies and other pharmaceutical companies can purchase prescription medications. Our system
            also allows the pharmacy to make immediate purchases from the suppliers of their choice, making it easier than ever to purchase top
            quality pharmaceuticals.
          </Typography>
        </Stack>
        <Stack gap={1 / 2}>
          <Typography variant="h6" fontWeight="SemiBold">
            Are there costs of using this service?
          </Typography>
          <Typography>
            Becoming a customer is free for licensed pharmaceutical buying establishments. There are no fees to register or make purchases.
          </Typography>
        </Stack>
        <Stack gap={1 / 2}>
          <Typography variant="h6" fontWeight="SemiBold">
            Is there a contract that needs completion in order to purchase?
          </Typography>
          <Typography>No, there is no need to sign a purchasing contract to become a customer.</Typography>
        </Stack>
        <Stack gap={1 / 2}>
          <Typography variant="h6" fontWeight="SemiBold">
            How does RX Trade Solutions generate revenue??
          </Typography>
          <Typography>
            RX Trade Solutions follows a model where the vendors pay a small percentage for the items they sell on our platform.
          </Typography>
        </Stack>
        <Stack gap={1 / 2}>
          <Typography variant="h6" fontWeight="SemiBold">
            How long does shipping take?
          </Typography>
          <Typography>
            Our vendors have varying shipping methods to meet demands such as free next-day, 2nd day, and ground shipping when the purchase order
            minimum is met. If the minimum purchase order is not met, shipping options available will be shown at an additional fee, if any.
          </Typography>
        </Stack>
        <Stack gap={1 / 2}>
          <Typography variant="h6" fontWeight="SemiBold">
            Is there a way to track your order?
          </Typography>
          <Typography>Once logged in, select the “Manage Purchases” tab to view order and tracking information.</Typography>
        </Stack>
        <Stack gap={1 / 2}>
          <Typography variant="h6" fontWeight="SemiBold">
            How to contact RX Trade Solutions?
          </Typography>
          <Typography>
            You can send an email to
            <a style={{ color: "#0f18ef", wordBreak: "break-word" }} href="mailto: customerservice@RxTradeSolutions.com">
              {" "}
              customerservice@RxTradeSolutions.com{" "}
            </a>
            or complete our “Contact Us” form and we will get back to you as soon as possible
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Faqs;
