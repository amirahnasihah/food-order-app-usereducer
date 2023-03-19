import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useItemsCrud } from "../store/ItemsProvider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function DeleteModal({ open, onClose, item }) {
  const { removeItem } = useItemsCrud();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <Typography variant="h6" component="span" color="error">
            Delete
          </Typography>{" "}
          this item?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          This action cannot be undone. <br /> Do you really want to proceed
          with{" "}
          <Typography component="span" color="error">
            deleting {item.name}?
          </Typography>
        </Typography>
        <Box sx={{ "& button": { m: 1 } }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            type="submit"
            onClick={() => {
              removeItem(item.id);
              toast.error("Item Deleted Successfully");
            }}
          >
            <DeleteForeverIcon />
            Yes
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            onClick={onClose}
          >
            <CancelIcon />
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
