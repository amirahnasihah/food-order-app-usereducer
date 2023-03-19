import React, { Fragment, useContext } from "react";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import cartContext from "../store/cart-context";

export default function CartItem({ cartItem }) {
  const { name, quantity, price, description, imageUrl } = cartItem;

  const cartCtx = useContext(cartContext);

  const handleAddItem = () => {
    cartCtx.addItem({ ...cartItem, quantity: 1 });
  };

  const handleRemoveItem = () => {
    cartCtx.removeItem(cartItem.id);
  };

  return (
    <Grid item xs={12} sm={12} md={2}>
      <List
        sx={{
          width: "100%",
          maxWidth: "auto",
          bgcolor: "background.transparent",
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={description} src={imageUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  RM{price}
                </Typography>
                {" — "} ×{quantity}
              </Fragment>
            }
          />

          <Grid item xs={6} sm={12} md={2}>
            <Tooltip title="add 1">
              <IconButton
                onClick={handleAddItem}
                sx={{
                  color: "green",
                  border: "1px solid",
                  m: 1,
                }}
                size="small"
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="remove 1">
              <IconButton
                onClick={handleRemoveItem}
                sx={{ color: "black", border: "1px solid", m: 1 }}
                size="small"
              >
                <RemoveIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </Grid>
  );
}
