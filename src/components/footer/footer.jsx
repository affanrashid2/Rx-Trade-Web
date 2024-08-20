"use client";
import React from "react";

import { Box, Container, Grid, IconButton, List, ListItem, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { FacebookOutlinedIcon, FooterLogo, InstagramIcon, LinkedInIcon, TwitterIcon } from "@/assets";
import { filteredProducts } from "@/global";
import { setFilter } from "@/store/reducer";

const Footer = () => {
  const year = new Date().getFullYear();
  const responsive = useMediaQuery("(max-width:900px)");
  const wrapFooter = useMediaQuery("(max-width:650px)");
  return (
    <Box sx={{ bgcolor: "primary.main", color: "#fff" }}>
      <Container maxWidth="lg">
        <Stack pt={4} pb={5} gap={3}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={3} lg={4}>
              <Stack height={1} alignItems="center" justifyContent="center">
                {/* <Stack alignItems="center" gap={8}> */}
                <Image src={FooterLogo} alt="" />
                {/* <Stack direction="row" gap={1}>
                    <IconButton>
                      <FacebookOutlinedIcon sx={{ color: "#fff", height: "36px", width: "36px" }} />
                    </IconButton>
                    <IconButton>
                      <InstagramIcon sx={{ color: "#fff", height: "36px", width: "36px" }} />
                    </IconButton>
                    <IconButton>
                      <LinkedInIcon sx={{ color: "#fff", height: "36px", width: "36px" }} />
                    </IconButton>
                    <IconButton>
                      <TwitterIcon sx={{ color: "#fff", height: "36px", width: "36px" }} />
                    </IconButton>
                  </Stack> */}
                {/* </Stack> */}
              </Stack>

              {!responsive && (
                <Typography textAlign="center" whiteSpace="nowrap">
                  @{year} All rights reserved.
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={9} lg={8}>
              <Stack direction={!wrapFooter ? "row" : "column"} justifyContent="space-between" gap={{ xs: 2, sm: 0, md: 1, lg: 5 }}>
                <FooterList heading="Categories" items={filteredProducts} isFilter />
                <FooterList
                  heading="Support"
                  items={[
                    { title: "FAQs", value: "/faqs" },
                    { title: "About Us", value: "/about-us" },
                    { title: "Privacy Policy", value: "privacy-policy" },
                    { title: "Return Policy", value: "/return-policy" },
                    { title: "Terms and Conditions", value: "/terms-and-conditions" },
                  ]}
                />
                <List>
                  <Stack gap={1} sx={{ maxWidth: "230px" }}>
                    <ListItem sx={{ px: 0 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Contact Us
                      </Typography>
                    </ListItem>
                    {/* <ListItem>
                      <Typography variant="body1">
                        Lorem Ipsum Residences <br /> 1234 Dolor Sit Amet St.
                        <br /> Suite 567 <br /> Consectetur, Adipiscing Elit 89012United States
                      </Typography>
                    </ListItem> */}
                    {/* <ListItem component={Stack} alignItems="flex-start">
                      <Typography variant="body1">
                        <Typography component="span" fontWeight="SemiBold">
                          Phone:{" "}
                        </Typography>
                        (123) 456-7890
                      </Typography> */}
                    {/* </ListItem> */}
                    <Typography variant="body1">
                      <Typography component="span" fontWeight="SemiBold">
                        Email:
                        <br />
                      </Typography>
                      <a href="mailto: contact@rxtradesolutions.com">contact@rxtradesolutions.com</a>
                    </Typography>
                  </Stack>
                </List>
              </Stack>
            </Grid>
          </Grid>
          {responsive && <Typography whiteSpace="nowrap">@{year} All rights reserved.</Typography>}
        </Stack>
      </Container>
    </Box>
  );
};
export default Footer;

const FooterList = ({ heading, items, isFilter = false }) => {
  const dispatch = useDispatch();
  const handleFilter = (filter) => {
    if (isFilter) {
      dispatch(setFilter(filter));
    }
  };
  return (
    <List>
      <Stack gap={1}>
        <ListItem sx={{ padding: 1 }}>
          <Typography variant="h6" fontWeight="bold" whiteSpace="nowrap">
            {heading}
          </Typography>
        </ListItem>
        {items.map((item, i) => (
          <ListItem key={i} sx={Styles.listItem} onClick={() => handleFilter(item)}>
            <Link href={isFilter ? `/home` : `${item?.value}`}>
              <Typography whiteSpace="nowrap">{item?.title}</Typography>
            </Link>
          </ListItem>
        ))}
      </Stack>
    </List>
  );
};

const Styles = {
  listItem: {
    padding: 1,
    cursor: "pointer",
    "&:hover": { color: "secondary.main" },
    maxWidth: "240px",
  },
  listContainer: {
    backgroundColor: "primary.main",
    color: "#fff",
  },
  icon: {
    color: "white",
  },
};
