import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function FilledAlerts() {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
    >
      <Alert
        variant="filled"
        severity="error"
        sx={{
          fontSize: "2.5rem",
          padding: "20px", // Increase padding for the alert box
          minWidth: "300px", // Minimum width of the alert box
          minHeight: "100px", // Minimum height of the alert box
          display: "flex",
          alignItems: "center",
        }}
      >
        The Device is offline.
      </Alert>
    </Stack>
  );
}
