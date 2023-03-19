import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import Meals from "./Meals";
import AdminForm from "./AdminForm";

export default function Main() {
  const [isValid, setIsValid] = useState(false);
  const showAddItemForm = () => setIsValid(true);
  const hideAddItemForm = () => setIsValid(false);

  return (
    <Grid item xs={12} sm={12} md={12} lg={4}>
      <Box
        sx={{
          width: "100%",
          color: "#fff",
          "& > .MuiBox-root > .MuiBox-root": {
            p: 1,
            fontSize: "0.875rem",
            fontWeight: "700",
          },
        }}
      >
        <Box>
          <Box sx={{ gridArea: "main", bgcolor: "secondary.light" }}>
            {isValid ? (
              <AdminForm hideAddItemForm={hideAddItemForm} />
            ) : (
              <Button variant="contained" onClick={showAddItemForm}>
                Add Food Item
              </Button>
            )}
            <Meals />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
