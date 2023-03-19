import React, { useContext } from "react";
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import cartContext from "../store/cart-context";

function Appbar({ showModalHandler }) {
  const cartCtx = useContext(cartContext);
  const { items } = cartCtx;

  const cartLength = items ? items.length : 0;

  return (
    <AppBar sx={{ bgcolor: "transparent" }} elevation={0}>
      <Toolbar
        position="static"
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          className="button-74"
          onClick={showModalHandler}
          sx={{
            color: "#ff9900",
            backgroundColor: "#fff",
            gap: 2,
            borderRadius: 10,
            border: "1px solid",
          }}
          aria-label="cart"
        >
          <Badge badgeContent={cartLength} color="warning">
            <ShoppingCartIcon />
          </Badge>
          <Typography variant="body1">My Cart</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
