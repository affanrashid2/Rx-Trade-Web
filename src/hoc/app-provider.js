"use client";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Loader, Toast, MainDrawer } from "@/components";
import SplashScreen from "@/components/splash-screen/splash-screen";
import { TOKEN_KEY } from "@/global";
import ApiManager from "@/helper/api-manager";
import { closeToast, setUser } from "@/store/reducer";

const AppProvider = ({ children }) => {
  const [loading, setIsLoading] = useState(true);
  const { toast } = useSelector((state) => state.appReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    async function init() {
      try {
        let token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          let { data } = await ApiManager("get", "auths/me");
          dispatch(setUser(data?.response?.details));
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
        }
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      {toast.open && (
        <Toast open={toast.open} message={toast.message} type={toast.type} duration={toast.duration} handleClose={() => dispatch(closeToast())} />
      )}
      <Loader />
      <MainDrawer />
      {children}
    </>
  );
};

export default AppProvider;
