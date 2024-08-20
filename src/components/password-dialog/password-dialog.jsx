import * as React from "react";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { InputField } from "..";
import { CloseIcon } from "@/assets";

export default function AlertDialog({ open, onClose }) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <IconButton sx={{ m: 1, ml: "auto" }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {/* <DialogTitle id="alert-dialog-title">{"Enter Password to continue"}</DialogTitle> */}
        <Stack p={2} pb={5} gap={3} alignItems="center">
          <Typography variant="h4" fontWeight="bold" color="text.secondary">
            Enter Password to continue
          </Typography>
          <Stack gap={2} px={8}>
            <Typography textAlign="center">To edit information you must have to enter your password.</Typography>
            <InputField size="small" label="Enter Password" />
            <Button variant="contained" onClick={onClose} autoFocus sx={{ mt: 3 }}>
              Next
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </React.Fragment>
  );
}
