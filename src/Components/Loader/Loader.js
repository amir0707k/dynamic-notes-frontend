import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <div className="loader" sx={{ display: "flex" }}>
      <CircularProgress />
    </div>
  );
}
