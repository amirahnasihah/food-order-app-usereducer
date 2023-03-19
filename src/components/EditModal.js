import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { useItemsCrud } from "../store/ItemsProvider";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "secondary.light",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function EditModal({ open, onClose, item }) {
  const { updateItem } = useItemsCrud();
  const [editedItem, setEditedItem] = useState(item);
  const { name, description, price } = editedItem;

  const savedUpdate = (e) => {
    e.preventDefault();

    // from context provider //
    try {
      updateItem(editedItem.id, { ...editedItem });
      toast.success("Item Updated Successfully");
      onClose();
    } catch (error) {
      toast.error(`Error updating item: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    // console.log("handleInputChange", e);
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <Typography variant="h6" component="span">
            Edit
          </Typography>{" "}
          food item
        </Typography>

        <Grid>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "31ch" },
            }}
            autoComplete="off"
            noValidate
            onSubmit={savedUpdate}
          >
            <Box>
              <TextField
                id="outlined-basic"
                label="Name"
                name="name"
                variant="outlined"
                value={name}
                onChange={handleInputChange}
              />
            </Box>

            <Box>
              <TextField
                id="filled-multiline-flexible"
                multiline
                maxRows={4}
                label="Description"
                placeholder="Description"
                name="description"
                value={description}
                onChange={handleInputChange}
              />
            </Box>

            <FormControl required sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">RM</InputAdornment>
                }
                label="Price"
                name="price"
                type="number"
                value={price}
                onChange={handleInputChange}
              />
            </FormControl>

            <Typography id="modal-modal-description" sx={{ m: 1 }}>
              Do you want to proceed with editing this {item.name}?
            </Typography>

            <Box sx={{ "& button": { ml: 1 } }}>
              <Button
                variant="contained"
                color="warning"
                size="small"
                type="submit"
              >
                <EditIcon />
                Save
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={onClose}
              >
                <CancelIcon />
                Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Modal>
  );
}
