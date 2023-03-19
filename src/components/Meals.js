import React from "react";
import { useItemsCrud } from "../store/ItemsProvider";
import { Grid, Typography } from "@mui/material";
import MealsItem from "./MealsItem";

const Meals = () => {
  const { itemsData } = useItemsCrud();

  return (
    <Grid
      sx={{
        pt: 5,
        bgcolor: "secondary.light",
      }}
    >
      <Typography variant="h4" arked="center" align="center" gutterBottom>
        Available Foods
      </Typography>

      <Grid container spacing={1}>
        {itemsData.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
            <MealsItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Meals;
