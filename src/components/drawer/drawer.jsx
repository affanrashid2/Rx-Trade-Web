import { useEffect } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { Logo, LogoutIcon, SearchIcon, ShoppingCartIcon } from "@/assets";
import { toggleMenu, setToast, logoutUser, closeMenu } from "@/store/reducer";

export default function MainDrawer() {
  const { openMenu, isLogged } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setToast({ type: "success", message: "Logout Successfully!" }));
    dispatch(logoutUser());
  };

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
            path: "/",
          },
          {
            label: "Wishlist",
            path: "/wishlist",
          },
          {
            label: "Search",
            path: "/search",
          },
          {
            label: "Card",
            path: "/card",
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
          {
            label: "Sign Up",
            path: "/signup-customer",
          },
        ]),
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }}>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton LinkComponent={Link} href={item?.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {isLogged ? (
          <ListItem disablePadding LinkComponent={Link} onClick={handleLogout}>
            <ListItemButton>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} href={"/login"}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={openMenu} onClose={toggleDrawer}>
        <ListItem>
          <Image src={Logo} style={{ maxWidth: 200 }} alt="logo" />
        </ListItem>
        {DrawerList}
      </Drawer>
    </div>
  );
}
