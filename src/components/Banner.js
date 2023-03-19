import React from "react";
import BannerLayout from "../mui-styles/BannerLayout.js";
import { Button, Typography } from "@mui/material";
import banner from "../assets/banner.png";

const backgroundImage = banner;

export default function Banner() {
  return (
    <BannerLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
      }}
    >
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Kuali Kravings
      </Typography>

      <Typography
        variant="subtitle1"
        color="inherit"
        sx={{
          p: 2,
          maxWidth: "750px",
          textAlign: "justify",
        }}
      >
        Look no further! With a variety of traditional and modern Malaysian
        snacks to choose from, you'll never get bored. Start browsing our
        selection of mouth-watering snacks and get ready to snack like a boss!
      </Typography>
      <Button
        variant="contained"
        size="small"
        component="button"
        sx={{ minWidth: 120, mt: 5, borderRadius: 5, backgroundColor: "grey" }}
      >
        Discover
      </Button>
    </BannerLayout>
  );
}
