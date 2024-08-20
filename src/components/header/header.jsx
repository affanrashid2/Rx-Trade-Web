"use client";

import React, { useEffect, useState } from "react";

import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Container, List, ListItem, ListItemText, Menu, MenuItem, Popover, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { CreditCardIcon, Logo, LogoutIcon, SearchIcon, ShoppingCartIcon } from "@/assets";
import useGetCartCount from "@/hooks/getCartCount";
import { logoutUser, setCartCount, setToast, toggleMenu, closeMenu, setFilter } from "@/store/reducer";

export default function Header() {
  const { isLogged, cartCount } = useSelector((state) => state.appReducer);
  let dispatch = useDispatch();
  const path = usePathname();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = !!anchorEl;
  const getCartCount = useGetCartCount();

  useEffect(() => {
    dispatch(closeMenu());
    if (path != "home") {
      dispatch(setFilter({}));
    }
  }, [path]);

  let navItems = [
    {
      label: "Home",
      path: isLogged ? "/home" : "/",
    },
    ...(isLogged
      ? [
          {
            label: "Manage Purchases",
            path: "/manage-purchase",
          },
          {
            label: "Manage Account",
            path: "/user-profile",
          },
          {
            label: "Wishlist",
            path: "/wishlist",
          },
        ]
      : [
          {
            label: "About Us",
            path: "/about-us",
          },
          {
            label: "Contact Us",
            path: "/contact-us",
          },
        ]),
  ];

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setToast({ type: "success", message: "Logout Successfully!" }));
    dispatch(logoutUser());
  };

  useEffect(() => {
    getCartCount();
  }, [getCartCount]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "white", py: 1.8 }} elevation={0}>
        <Toolbar disableGutters>
          <Stack direction="row" justifyContent="space-between" width={1} alignItems="center" sx={{ maxWidth: "lg", mx: { xs: 1.5, lg: "auto" } }}>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" color="inherit" onClick={() => dispatch(toggleMenu())} sx={{ p: 0 }}>
                <MenuIcon sx={{ color: "#969696", fontSize: "30px" }} />
              </IconButton>
            </Box>
            <Box sx={{ flex: { xs: 1, md: "unset" } }} component={Link} href={isLogged ? "/home" : "/"}>
              <Image src={Logo} alt="" style={{ margin: "0 auto", maxWidth: "230px" }} />
            </Box>

            <Stack direction="row" gap={1} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
              {navItems.map((item) => (
                <React.Fragment key={item.label}>
                  <Button
                    sx={{
                      ...Styles.btn,
                      ...(path === item?.path && {
                        fontWeight: "SemiBold",
                        color: "rgb(0 136 165)",
                      }),
                    }}
                    href={item?.path}
                    component={Link}
                  >
                    {item.label}
                  </Button>
                </React.Fragment>
              ))}
              {!isLogged && (
                <Button
                  component={Link}
                  href="#"
                  endIcon={<ExpandMore />}
                  onClick={handlePopoverOpen}
                  sx={{
                    ...Styles.btn,
                  }}
                >
                  Sign Up
                </Button>
              )}
              <Menu
                open={open && anchorEl !== null}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      left: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{ top: 0 }}
              >
                <List>
                  <Link href="/signup-customer">
                    <ListItem button onClick={handlePopoverClose}>
                      <ListItemText primary="As Customer" />
                    </ListItem>
                  </Link>
                  <Link href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/signup-vendor`}>
                    <ListItem button onClick={handlePopoverClose}>
                      <ListItemText primary="As Vendor" />
                    </ListItem>
                  </Link>
                </List>
              </Menu>
            </Stack>
            {isLogged ? (
              <Stack direction="row" gap={2} alignItems="center">
                <IconButton LinkComponent={Link} href="/card" sx={{ display: { xs: "none", md: "flex" } }}>
                  <CreditCardIcon
                    sx={{
                      color: "primary.main",
                    }}
                  />
                </IconButton>
                <IconButton LinkComponent={Link} href="/cart">
                  <Badge
                    badgeContent={cartCount}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#FF5252",
                        color: "white",
                      },
                    }}
                    max={999}
                  >
                    <ShoppingCartIcon sx={{ color: "primary.main" }} />
                  </Badge>
                </IconButton>
                <IconButton LinkComponent={Link} href="/search" sx={{ display: { xs: "none", md: "flex" } }}>
                  <SearchIcon sx={{ color: "primary.main" }} />
                </IconButton>
                <IconButton onClick={handleLogout} sx={{ display: { xs: "none", md: "flex" } }}>
                  <LogoutIcon sx={{ color: "primary.main" }} />
                </IconButton>
              </Stack>
            ) : (
              <Button variant="contained" LinkComponent={Link} href="/login" sx={{ display: { xs: "none", md: "block" } }}>
                Login
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

let Styles = {
  btn: { color: "black", fontSize: "16px", fontWeight: "400" },
};
