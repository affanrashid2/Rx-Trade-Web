import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import ApiManager from "@/helper/api-manager";
import { setCartCount,  } from "@/store/reducer";

const useGetCartCount = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.appReducer);

  const getCartCount = useCallback(async () => {
    if(isLogged){

      try {
        let { data } = await ApiManager("get", `carts/count`);
        dispatch(setCartCount(data?.response?.details?.count));
      } catch (error) {
      console.log(error);   
    }
  }
  }, [dispatch, isLogged]);

  return getCartCount;
};

export default useGetCartCount;
