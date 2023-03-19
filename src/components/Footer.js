import React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography, Link } from "@mui/material";
import "../App.css";
import { useItemsCrud } from "../store/ItemsProvider";
import icon from "../assets/icon.png";

export default function Footer() {
  const { switchPage, togglePage } = useItemsCrud();

  return (
    <footer>
      <Grid item xs={6} sm={4} md={2}>
        <Box sx={{ gridArea: "footer", bgcolor: "warning.dark" }}>
          <Box sx={{ pt: 1 }}>
            <img src={icon} alt="icon ketupat" />
          </Box>
          <Box>
            <Button
              variant="contained"
              size="small"
              onClick={togglePage}
              sx={{ mb: 1 }}
            >
              {switchPage ? "Admin" : "Users"}
            </Button>
          </Box>

          <Grid item xs={6} sm={4} md={2}>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="">Terms</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="">Privacy</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {"made by "}
              <Link
                href="http://amrhnshh-minimalist.vercel.app/"
                rel="website"
                title="Amirah Nasihah"
                target="_blank"
              >
                amirahnasihah
              </Link>
              {" source code can be accessed on "}
              <Link
                href="https://github.com/amirahnasihah/food-order-website"
                title="GitHub food-order-website"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </footer>
  );
}
