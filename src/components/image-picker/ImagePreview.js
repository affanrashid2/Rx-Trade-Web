import React from "react";

import { Box } from "@mui/material";
import Image from "next/image";

const ImagePreview = ({ imgUrl, width, height }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          background: `url(${imgUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "blur(50px)",
          backgroundPosition: "50%",
        }}
      ></Box>
      <Box sx={{ zIndex: 1 }}>
        {/* <Box component={"img"} src={imgUrl} sx={{ width: "100%", height: "100%", maxWidth: width, maxHeight: height }} /> */}
        <Image alt="" width={500} height={214} src={imgUrl} />
      </Box>
    </>
  );
};

export default ImagePreview;
