import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { Box, Grid } from "@mui/material";

const Admin = () => {
  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          gridTemplateRows: "auto",
          gridTemplateAreas: `"sidebar main main"`,
        }}
      >
        <Box sx={{ gridArea: "sidebar", bgcolor: "white" }}>
          <Sidebar />
        </Box>
        <Box
          sx={{
            gridArea: "main",
            bgcolor: "secondary.main",
          }}
        >
          <Main />
        </Box>
      </Box>
    </Grid>
  );
};

export default Admin;
