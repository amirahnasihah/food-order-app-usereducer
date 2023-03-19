import React, { useContext } from "react";
import CartItem from "./CartItem";
import { Box, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import cartContext from "../store/cart-context";

export default function Cart({ hideModalHandler, onOrderItems }) {
  const cartCtx = useContext(cartContext);

  const handleClearAll = () => {
    cartCtx.clearCart();
  };

  return cartCtx.items.length > 0 ? (
    <Grid className="modal">
      <Box sx={{ textAlign: "right", "& button": { m: 1 } }}>
        <Typography
          sx={{ textAlign: "center", mt: 1 }}
          variant="h5"
          component="div"
        >
          Items in the cart:
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={handleClearAll}
        >
          <ClearIcon fontSize="small" />
          Clear
        </Button>
        {cartCtx.items.map((item) => (
          <CartItem cartItem={item} key={item.id} />
        ))}
      </Box>
      <Box sx={{ pt: 3, textAlign: "center" }}>
        <Chip
          color="warning"
          label={
            <Typography variant="body2" sx={{ fontWeight: "bolder" }}>
              Total Amount: RM {cartCtx.totalAmount}
            </Typography>
          }
          variant="filled"
        />
      </Box>
      <Box sx={{ "& button": { m: 1 } }}>
        <Button variant="contained" size="small" onClick={hideModalHandler}>
          Close
        </Button>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={onOrderItems}
        >
          Order
        </Button>
      </Box>
    </Grid>
  ) : (
    <Grid className="modal">
      <Box>
        <Typography
          sx={{ textAlign: "center", mt: 1 }}
          variant="h5"
          component="div"
        >
          No items in the cart currently
        </Typography>
        <Box sx={{ pt: 3, textAlign: "center" }}>
          <Divider sx={{ pt: 3 }}>
            <Chip
              color="warning"
              label={
                <Typography variant="body2" sx={{ fontWeight: "bolder" }}>
                  Total Amount: RM {cartCtx.totalAmount}
                </Typography>
              }
              variant="filled"
            />
          </Divider>
        </Box>
      </Box>
      <Button
        variant="contained"
        size="small"
        onClick={hideModalHandler}
        sx={{ m: 1 }}
      >
        Close
      </Button>
    </Grid>
  );
}
