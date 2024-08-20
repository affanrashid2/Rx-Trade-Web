import React from "react";

import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast({ open = false, type = "error", message = "", handleClose = () => {}, duration = 3000 }) {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={() => handleClose()} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert onClose={() => handleClose()} severity={type} sx={{ width: "100%" }}>
        {message || "Error occurred."}
      </Alert>
    </Snackbar>
  );
}
