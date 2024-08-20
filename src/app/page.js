"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { BannerImage } from "@/assets";
import { Banner, Footer, Header } from "@/components";

const Main = () => {
  const { isLogged } = useSelector((state) => state.appReducer);
  const router = useRouter();

  useEffect(() => {
    if (isLogged) {
      router.push("/home");
    }
  }, [isLogged]);
  return (
    <>
      <Header />
      <Banner image={BannerImage} text="ee" />
      <Footer />
    </>
  );
};

export default Main;
