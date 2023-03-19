import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import "../App.css";
import React, { useContext, useState } from "react";
import DeleteModal from "./DeleteModal";
import itemsContext from "../store/items-context";
import EditModal from "./EditModal";
import cartContext from "../store/cart-context";

const MealsItem = ({ item }) => {
  const { name, imageUrl, price, description } = item;
  const itemsCtx = useContext(itemsContext);
  const cartCtx = useContext(cartContext);

  // delete modal
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);

  // edit modal
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const addToCart = () => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item sx={{ p: 1 }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={description}
            image={imageUrl}
            sx={{ height: 140 }}
          />
          <CardContent sx={{ height: 150 }}>
            <Typography variant="h5" component="div">
              {name}
            </Typography>

            <Typography
              variant="body2"
              component="div"
              color="text.secondary"
              sx={{
                display: "flex",
              }}
            >
              <Typography
                variant="body2"
                component="div"
                color="text.secondary"
                sx={{
                  overflow: "auto",
                  maxHeight: "100px",
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {description}
              </Typography>
              <Chip
                color="warning"
                size="small"
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    RM {price}
                  </Typography>
                }
              />
            </Typography>
          </CardContent>

          <CardActions>
            <Box
              sx={{
                "& button": { m: 1 },
              }}
            >
              {itemsCtx.switchPage ? (
                <Button
                  color="primary"
                  size="small"
                  type="submit"
                  onClick={addToCart}
                >
                  Add To Cart
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleOpenDel}
                  >
                    Delete
                  </Button>
                  <DeleteModal
                    item={item}
                    open={openDel}
                    onClose={handleCloseDel}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    onClick={handleOpenEdit}
                  >
                    Edit
                  </Button>
                  <EditModal
                    item={item}
                    open={openEdit}
                    onClose={handleCloseEdit}
                  />
                </>
              )}
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MealsItem;
