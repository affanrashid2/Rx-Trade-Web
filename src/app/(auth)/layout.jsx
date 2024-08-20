"use client";

import { Box, Button, Container, Stack } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { ArrowBackIosIcon, AuthBg, BannerImage } from "@/assets";
import { Footer, Header } from "@/components";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  // const showBackButton = pathname !== "/login" && pathname !== "/sign-up";
  const showBackButton = true;
  let isSignUp = pathname.startsWith("/signup");
  const { isLogged } = useSelector((state) => state.appReducer);

  if (isLogged) {
    router.push("/home");
  } else {
    return isSignUp ? (
      <>
        <Header />
        <Container sx={{ minHeight: "calc(100vh - 571px)", bgcolor: "#fff" }} maxWidth="lg">
          {children}
        </Container>
        <Footer />
      </>
    ) : (
      <Box sx={AuthStyles.box}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            width: "60%",
            backgroundImage: `url(${AuthBg?.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          {/* <Image
          style={{
            position: "absolute",
            top: "45px",
            left: "45px",
          }}
          alt="Auth Banner"
          src={VoltzWhiteLogo}
        /> */}
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "42%" },
            height: "100%",
            marginLeft: { xs: "0px", md: "-20px" },
            borderRadius: { xs: "0px", md: "20px 0px 0px 20px" },
            overflow: "auto",
          }}
          elevation={0}
        >
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              position: "relative",
              py: { xs: 3, sm: 10 },
              px: { xs: 2, sm: 15, md: 6, xl: 10 },
              minHeight: 1,
              bgcolor: "white",
            }}
          >
            {showBackButton && (
              <Button
                onClick={() => router.push("/")}
                sx={{
                  alignSelf: "flex-start",
                  position: "fixed",
                  top: 50,
                  ml: -1,
                }}
                startIcon={<ArrowBackIosIcon />}
              >
                Back
              </Button>
            )}
            {children}
          </Stack>
        </Box>
      </Box>
    );
  }
}

const AuthStyles = {
  box: {
    height: "100vh",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "row",
  },
};
