import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import food from "../assets/food.png";
import InfoIcon from "@mui/icons-material/Info";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  p: 5,
};

function AboutUs() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        overflow: "hidden",
        bgcolor: "secondary.light",
      }}
    >
      <Container sx={{ display: "flex", position: "relative" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Box sx={item}>
              <Typography
                variant="h4"
                arked="center"
                align="center"
                gutterBottom
              >
                DELICIOUS FOOD FOR PEOPLE
              </Typography>
              <Typography variant="h6" sx={{ my: 2 }}>
                Aunthetic Taste
              </Typography>
              <Typography variant="body1" gutterBottom>
                Experience the authentic taste of Malaysia with our snack food
                menu ordering website. Our snacks are made using only the
                freshest and highest-quality ingredients, giving you the real
                taste of Malaysian cuisine. From traditional snacks to trendy
                new flavors, our selection will satisfy any snack craving.
              </Typography>
              <Typography variant="h6" sx={{ my: 2 }}>
                New experience
              </Typography>
              <Typography variant="body1" gutterBottom>
                Tired of the same old snacks? We've got you covered! Our snack
                food menu ordering website offers a wide variety of snacks that
                are both traditional and trendy. With new snacks added
                regularly, you'll always have something new to try. Get ready
                for a snacking experience that will take your taste buds on an
                adventure!
              </Typography>
              <Button
                variant="button"
                onClick={() => {
                  console.info("For learn more");
                }}
              >
                <InfoIcon
                  fontSize="small"
                  sx={{ color: "warning.dark", mr: 1 }}
                />{" "}
                Learn more
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={food}
              alt="multiple food"
              sx={{
                height: 360,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutUs;
