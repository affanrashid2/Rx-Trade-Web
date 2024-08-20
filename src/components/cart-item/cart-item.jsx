"use client";
import { useCallback, useEffect, useState } from "react";

import { Avatar, Divider, IconButton, ListItem, TableCell, TableRow, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { Box, Stack } from "@mui/system";
import debounce from "lodash.debounce";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Counter } from "..";
import { DeleteOutlineOutlinedIcon, ImgNotFound, NotFound } from "@/assets";
import ApiManager from "@/helper/api-manager";
import useGetCartCount from "@/hooks/getCartCount";
import { handleLoader, setToast } from "@/store/reducer";

const CartItem = ({ product, getCart, setCartItems }) => {
  const [counter, setCounter] = useState(1);
  const mobile = useMediaQuery("(max-width:400px)");
  const isMScreen = useMediaQuery("(max-width:600px)");
  const isXsScreen = useMediaQuery("(max-width:700px)");
  const isSmScreen = useMediaQuery("(max-width:970px)");
  const isMdScreen = useMediaQuery("(max-width:830px)");
  const dispatch = useDispatch();
  const getCartCount = useGetCartCount();
  const router = useRouter();

  const { cartCount } = useSelector((state) => state.appReducer);

  const updateProductQuantity = async (quantity, currentCounter) => {
    try {
      let { data } = await ApiManager("post", "carts", {
        productId: product?.productId?._id,
        quantity,
        action: quantity > currentCounter ? "add" : "sub",
        replaceQuantity: true,
      });
      setCartItems(data?.response?.details);
    } catch (error) {
      dispatch(
        setToast({
          type: "error",
          message: "Something Went Wrong",
        })
      );
    }
  };

  const debouncedApiCall = useCallback(
    debounce((quantity, currentCounter) => {
      updateProductQuantity(quantity, currentCounter);
    }, 500),
    []
  );

  const handleCounter = (count) => {
    setCounter((prevCounter) => {
      debouncedApiCall(count, prevCounter);
      return count;
    });
  };

  useEffect(() => {
    setCounter(product?.quantity);
  }, [product]);

  const deleteCartProduct = async () => {
    dispatch(handleLoader(true));
    try {
      let { data } = await ApiManager("delete", `carts/${product?._id}`);
      await getCartCount();
      getCart();
      if (cartCount <= 1) {
        router.push("/home");
      }
      dispatch(setToast({ type: "success", message: data?.message }));
    } catch (error) {
      dispatch(setToast({ type: "error", message: error?.message }));
      dispatch(handleLoader(false));
    }
  };

  return (
    <TableRow
      sx={{
        "& .MuiTableCell-root": {
          textAlign: "center",
          borderBottom: "1px solid #C4C4C4",
          py: 2,
        },
      }}
    >
      {!isXsScreen && (
        <TableCell>
          <Avatar variant="rounded" src={product?.productId?.photos[0]} sx={{ mx: "auto", height: 56, width: 56 }} />
        </TableCell>
      )}
      {!isSmScreen && <TableCell>{product?.productId?.NDC || "-"}</TableCell>}
      <TableCell>
        <Stack alignItems="center">
          {(isMScreen || isXsScreen) && <Avatar variant="rounded" src={product?.productId?.photos[0]} sx={{ mx: "auto", height: 56, width: 56 }} />}
          {product?.productId?.name || "-"}
          {isMScreen && <Counter handleChange={handleCounter} initialValue={counter} disabled={counter == product?.productId?.available} />}
        </Stack>
      </TableCell>
      {!isXsScreen && <TableCell>{product?.productId?.manufacturer || "-"}</TableCell>}
      {!isMdScreen && <TableCell>{product?.productId?.expiration ? moment(product?.productId?.expiration).format("MMM YYYY") : "-"}</TableCell>}
      {!isMScreen && (
        <TableCell>
          <Counter handleChange={handleCounter} initialValue={counter} disabled={counter == product?.productId?.available} />
        </TableCell>
      )}
      <TableCell sx={{ position: "relative" }}>
        <Typography fontWeight="SemiBold" color="text.secondary">
          {"$" + product?.quantityMulPrice}
        </Typography>
        <Tooltip title="Delete" placement="top">
          <IconButton sx={{ position: "absolute", bottom: 3, right: 3 }}>
            <DeleteOutlineOutlinedIcon onClick={deleteCartProduct} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
// "use client";
// import { useCallback, useEffect, useState } from "react";

// import {
//   Divider,
//   IconButton,
//   ListItem,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { Box, Stack } from "@mui/system";
// import debounce from "lodash.debounce";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";

// import { Counter } from "..";
// import { DeleteOutlineOutlinedIcon, ImgNotFound, NotFound } from "@/assets";
// import ApiManager from "@/helper/api-manager";
// import useGetCartCount from "@/hooks/getCartCount";
// import { handleLoader, setToast } from "@/store/reducer";
// import { useRouter } from "next/navigation";

// const CartItem = ({ product, getCart, setCartItems }) => {
//   const mobile = useMediaQuery("(max-width:400px)");
//   const [counter, setCounter] = useState(1);
//   const dispatch = useDispatch();
//   const getCartCount = useGetCartCount();
//   const router = useRouter();

//   const { cartCount } = useSelector((state) => state.appReducer);

//   const updateProductQuantity = async (quantity, currentCounter) => {
//     try {
//       let { data } = await ApiManager("post", "carts", {
//         productId: product?.productId?._id,
//         quantity,
//         action: quantity > currentCounter ? "add" : "sub",
//         replaceQuantity: true,
//       });
//       setCartItems(data?.response?.details);
//     } catch (error) {
//
//     }
//   };

//   const debouncedApiCall = useCallback(
//     debounce((quantity, currentCounter) => {
//       updateProductQuantity(quantity, currentCounter);
//     }, 500),
//     []
//   );

//   const handleCounter = (count) => {
//     setCounter((prevCounter) => {
//       debouncedApiCall(count, prevCounter);
//       return count;
//     });
//   };

//   useEffect(() => {
//     setCounter(product?.quantity);
//   }, [product]);

//   const deleteCartProduct = async () => {
//     dispatch(handleLoader(true));
//     try {
//       let { data } = await ApiManager("delete", `carts/${product?._id}`);
//       await getCartCount();
//       getCart();
//       if (cartCount <= 1) {

//         router.push('/home')
//       }
//       dispatch(setToast({ type: "success", message: data?.message }));
//     } catch (error) {
//       dispatch(setToast({ type: "error", message: error?.message }));
//     }
//     dispatch(handleLoader(false));
//   };

//   return (
//     <>
//       <ListItem disablePadding>
//         <Box sx={{ p: 2 }} width={1}>
//           <Stack direction={mobile ? "column" : "row"} gap={2} width={1}>
//             <Box sx={{ height: 83, width: mobile ? "100%" : 83 }}>
//               <Image
//                 src={
//                   product?.productId?.photos?.length
//                     ? product?.productId?.photos[0]
//                     : ImgNotFound
//                 }
//                 style={{ height: "100%", width: "100%", borderRadius: "2px" }}
//                 alt=""
//                 width={100}
//                 height={100}
//               />
//             </Box>
//             <Stack flexGrow={1}>
//               <Stack
//                 direction="row"
//                 justifyContent="space-between"
//                 flexGrow={1}
//                 alignItems="center"
//               >
//                 <Typography variant="h6" fontWeight="Medium">
//                   {product?.productId?.name}
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   fontWeight="Medium"
//                   color="text.heading"
//                 >
//                   {"$" + product?.quantityMulPrice}
//                 </Typography>
//               </Stack>
//               <Stack
//                 direction="row"
//                 justifyContent="space-between"
//                 flexGrow={1}
//                 alignItems="center"
//               >
//                 <Counter
//                   handleChange={handleCounter}
//                   initialValue={counter}
//                   disabled={counter == product?.productId?.available}
//                 />
//                 <IconButton onClick={deleteCartProduct}>
//                   <DeleteOutlineOutlinedIcon />
//                 </IconButton>
//               </Stack>
//             </Stack>
//           </Stack>
//         </Box>
//       </ListItem>
//       <Divider sx={{ borderColor: "#edecec" }} />
//     </>
//   );
// };

// export default CartItem;
