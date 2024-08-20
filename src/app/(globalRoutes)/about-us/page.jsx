"use client";
import React from "react";

import { Box, Breadcrumbs, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { Doctor, Medicine } from "@/assets";

const About = () => {
  const BreadCrumbs = [
    <Link key="1" href="/">
      <Typography variant="h5" color="text.lightGrey" fontWeight="bold">
        Home
      </Typography>
    </Link>,
    <Typography key="3" variant="h5" color="primary.main" fontWeight="bold">
      About Us
    </Typography>,
  ];
  return (
    <Container maxWidth="lg">
      <Stack py={8} gap={5}>
        <Breadcrumbs separator={<Typography key="3" variant="h5" color="text.lightGrey" fontWeight="bold">{`>`}</Typography>} aria-label="breadcrumb">
          {BreadCrumbs}
        </Breadcrumbs>
        <Typography variant="h3" fontWeight="SemiBold" color="text.heading">
          About Us
        </Typography>
        <Box width={1}>
          <Image src={Doctor} alt="" />
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={4}>
            <Box height={{ xs: "300", md: "500px" }} sx={{}}>
              <Image style={{ height: "100%", borderRadius: "10px", width: "100%", objectFit: "cover" }} src={Medicine} alt="" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8} component={Stack} gap={1.5} direction="column">
            <Typography variant="h5" fontWeight="SemiBold">
              About RX Trade Solutions
            </Typography>
            Welcome to RX Trade Solutions, your premier e-commerce platform dedicated to providing convenient access to prescription medications. At
            RX Trade Solutions, we strive to create a seamless marketplace where vendors can showcase their products and customers can choose from a
            diverse range of trusted suppliers.
            <Typography variant="h6" fontWeight="SemiBold">
              Our Mission
            </Typography>
            Our mission at RX Trade Solutions is to empower customers with the ability to securely purchase prescription medications online from
            licensed vendors. We aim to facilitate a transparent and reliable marketplace that prioritizes customer safety and satisfaction.
            <Typography variant="h6" fontWeight="SemiBold">
              What We Offer
            </Typography>
            ● Wide Selection: Browse through a variety of prescription medications from multiple vendors, ensuring you find the products that best
            suit your needs. <br /> ● Quality Assurance: We verify all vendors to ensure they comply with legal regulations and uphold high standards
            of product quality and authenticity. <br /> ● Convenience: Enjoy the ease of purchasing medications online, with streamlined ordering and
            secure payment options. <br /> ● Customer Support: Our dedicated support team is available to assist you with any inquiries or concerns,
            ensuring a smooth and pleasant shopping experience.
            <Typography variant="h6" fontWeight="SemiBold">
              Vendor Partnership
            </Typography>
            At RX Trade Solutions, we welcome vendors who share our commitment to quality and customer satisfaction. By partnering with us, vendors
            gain access to a broad customer base and a platform that prioritizes visibility and reliability.
            <Typography variant="h6" fontWeight="SemiBold">
              Our Commitment to Safety and Compliance
            </Typography>
            We prioritize the safety and well-being of our customers by adhering strictly to regulatory guidelines and industry standards. Each
            transaction on our platform is conducted with the utmost consideration for privacy and confidentiality.
            <Typography variant="h6" fontWeight="SemiBold">
              Contact Us
            </Typography>
            Have questions or feedback? We’d love to hear from you! Contact our customer support team at customerservice@rxtradesolutions.com for
            assistance.
            <Typography variant="h6" fontWeight="SemiBold">
              Join Us
            </Typography>
            Whether you are a customer seeking reliable access to prescription medications or a vendor looking to expand your reach, RX Trade
            Solutions is here to serve you. Experience the convenience and assurance of shopping on our secure platform today. Thank you for choosing
            RX Trade Solutions, where your health and satisfaction are our priority
            {/* <Typography>We are dedicated to improving healthcare outcomes and enhancing the quality of life for individuals and communities worldwide. We strive to discover, develop, and deliver innovative medicines that address unmet medical needs, with a focus on patient-centricity, innovation, quality, integrity, and collaboration. With a rich history of innovation and growth, our experienced leadership team and diverse portfolio of medicines across
              <br />
              <br />
              various therapeutic areas aim to make a meaningful difference in the lives of our patients. We operate with transparency and ethics, fostering partnerships to advance healthcare outcomes, and are committed to making our medicines accessible to patients around the world.
              <br />
              <br />
              we are dedicated to improving healthcare outcomes and enhancing the quality of life for individuals and communities worldwide. We strive to discover, develop, and deliver innovative medicines that address unmet medical needs, with a focus on
              <br />
              <br />
              various therapeutic areas aim to make a meaningful difference in the lives of our patients. We operate with transparency and ethics, fostering partnerships to advance healthcare outcomes, and are committed to making our medicines accessible to patients around the world.

            </Typography> */}
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default About;
