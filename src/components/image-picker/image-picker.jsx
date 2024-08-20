"use client";
import React, { useEffect, useState } from "react";

// import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { DeleteForever, UploadFile } from "@mui/icons-material";
import { Box, Button, CardActionArea, Divider, Fab, Fade, FormHelperText, Paper, Stack, Tooltip, Typography, Zoom } from "@mui/material";

import ImagePreview from "./ImagePreview";
import { AddIcon, ArrowUpwardIcon, CloseIcon } from "@/assets";
import useImagePicker from "@/hooks/useImagePicker";

const ImagePicker = ({ height = "214px", error, onImageSelect = () => {}, multiple, maxFiles = 4 , previewImage ,type}) => {
  const { getRootProps, getInputProps, isDragActive, errors, selectedImages,setSelectedImages } = useImagePicker({ multiple, maxFiles ,type });

  const [medias, setMedias] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    if (selectedImages.length && selectedImages.length <= maxFiles) {
      setMedias(selectedImages);
      onImageSelect(selectedImages);
      setErrorState("");
      setActiveImage(0);
    }

    if (selectedImages.length && selectedImages.length > maxFiles) {
      setTimeout(() => {
        setErrorState("");
      }, 7000);
      return setErrorState("To many files");
    }
  }, [selectedImages]);

  const deleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    // setMedias(updatedImages);
    // onImageSelect(updatedImages);
    
    setSelectedImages(updatedImages)
  };


  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          ":hover": {
            "& .image-picker-delete-overlay": {
              scale: "1 !important",
            },
          },
        }}
      >
        {(!!medias?.length || previewImage )&&(
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              // background: "#DEDEDE",
              background: 'rgba(255,255,255,0.6)',
              zIndex: "999",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              scale: 0,
              transition: "0.1s",
            }}
            className="image-picker-delete-overlay"
          >
            <Stack spacing={1} direction={"row"}>
              <Tooltip title="Click to upload the file or drag and drop ">
                <Fab color="primary" onClick={getRootProps().onClick}>
                {(selectedImages?.length>0 && multiple) ? <AddIcon />:<UploadFile /> }
                  
                </Fab>
              </Tooltip>
              <Fab
                color="error"
                onClick={() => {
                  const updatedDate = medias.filter((_, i) => activeImage !== i);
                  onImageSelect(updatedDate);
                  setMedias(updatedDate);
                  deleteImage(activeImage)
                }}
              >
                <DeleteForever />
              </Fab>
            </Stack>
          </Box>
        )}
        <Box
          sx={{
            width: "100%",
            height: height,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            position: "relative",
            overflow: "hidden",
            border: error || !!errors?.length ? "1px solid red" : "1px dashed #236D7D",
          }}
          {...getRootProps()}
        >
          {isDragActive && (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "#DEDEDE",
                zIndex: "3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Drop the image here</Typography>
            </Box>
          )}
          {(!!medias?.length || previewImage ) && <ImagePreview imgUrl={previewImage || medias[activeImage]?.imageDataUrl} width="100%" height={height} />}

          {!(medias?.length || previewImage ) && (
            <Stack alignItems="center" gap={1.5} p={1}>
              <Fab color="primary" size="small">
                <ArrowUpwardIcon />
              </Fab>
              <Typography fontSize="14px" fontWeight="400">
                Drag your file(s) to start uploading
              </Typography>
              <Divider>OR</Divider>
              <Typography fontWeight="SemiBold" color="primary">
                Browse files
              </Typography>
              {!errors?.length && !errorState && !error && (
                <Typography color="text.lightGrey" variant="body2" textAlign="center">
                {type === 'pdf' ? "Only support .jpg .png .jpeg and .pdf" : "Only support .jpg .png and .jpeg "}  
                </Typography>
              )}
            </Stack>
          )}

          <input {...getInputProps()} id="pickerInput" />
        </Box>
      </Box>

      <Zoom in={!!errors?.length || errorState || error}>
        <FormHelperText error>{`${errors[0] || errorState || error}*`}</FormHelperText>
      </Zoom>
      {medias.length > 1 && (
        <Stack sx={{ overflow: "auto" ,p:1 }} direction={"row"} spacing={1} mt={1}>
          {medias?.map((each, i) => (
            <Box key={i} sx={{ position: "relative"}}>
              <CardActionArea
                sx={{
                  border: activeImage === i ? 5 : 3,
                  borderColor: activeImage === i ? "secondary.main" : "primary.main",
                  borderRadius: "10px",
                  width: "150px",
                  height: "90px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  minWidth: "150px",
                  overflow: "hidden",
                }}
                onClick={() => setActiveImage(i)}
              >
                <Box component="img" src={each?.banner_image_url || each?.imageDataUrl} sx={{ width: "100%", height: "100%" }} />
              </CardActionArea>
                <CloseIcon sx={{position:'absolute',backgroundColor:'#ddd5d5',cursor:'pointer',top: '-3px', right: '-3px',borderRadius:'15px',color:'grey',fontSize:"17px"}} onClick={()=>{
                  deleteImage(i)
                }}/> 
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ImagePicker;
