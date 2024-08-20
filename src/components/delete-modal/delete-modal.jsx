import React, { useState } from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField } from "@mui/material";

const ConfirmationModal = ({ title, open, children, hideFooter = false, onClose, matchText = "Delete", callBack = () => {} }) => {
  const [inputText, setInputText] = useState("");
  const isYesButtonDisabled = !inputText || inputText !== matchText;

  return (
    <Dialog title={title} open={open} onClose={onClose}>
      <Box>
        {children || (
          <>
            <DialogTitle>ATTENTION</DialogTitle>
            <DialogContent>
              <Box component={"span"}>
                Are you sure you want to permanently delete? Type:{" "}
                <Typography component={"span"} sx={{ fontWeight: 700 }} color={"primary"}>
                  {matchText}
                </Typography>
              </Box>
              <TextField
                label={`Type "${matchText}" to confirm`}
                placeholder={matchText}
                variant="outlined"
                fullWidth
                margin="normal"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </DialogContent>
          </>
        )}
        {!hideFooter && (
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              type="submit"
              disabled={isYesButtonDisabled}
              onClick={() => {
                callBack();
                setInputText("");
              }}
            >
              Yes
            </Button>
            <Button variant="contained" onClick={() => onClose()}>
              No
            </Button>
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
};

export default ConfirmationModal;
