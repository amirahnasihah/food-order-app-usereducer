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
} from "@mui/material";
import { useItemsCrud } from "../store/ItemsProvider";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import preview from "../assets/preview.png";

const initialState = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
};

const AdminForm = ({ hideAddItemForm }) => {
  const { addNewItem } = useItemsCrud();
  const [newItem, setNewItem] = useState(initialState);
  const { name, description, price, imageUrl } = newItem;
  const [previewImage, setPreviewImage] = useState(preview);
  const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || price === "" || imageUrl === "") {
      toast.warning("Please Fill All Fields");
    } else if (imageUrl === "") {
      toast.warning("Please Upload an Image");
    } else {
      toast.success("Item Added Successfully");

      // from items provider - post method //
      addNewItem({ ...newItem });
      // from items provider - post method //

      setNewItem({ name: "", description: "", price: "", imageUrl: "" });
      hideAddItemForm();
    }
  };

  const handleInputChange = (e) => {
    // console.log("handleInputChange", e);
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleUploadImage = async (file) => {
    // console.log("handleUploadImage", e);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      toast.success("Image Uploaded Successfully");
      setNewItem({ ...newItem, imageUrl: response.data.url });
      setPreviewImage(response.data.url);
    } catch (error) {
      toast.error("Error Upload Image");
    }
  };

  return (
    <Grid
      sx={{
        mb: 3,
        backgroundColor: "warning.main",
        width: "31ch",
        borderRadius: 2,
      }}
    >
      <Typography variant="body1" sx={{ color: "black", p: 1 }}>
        Add a new food
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "auto" },
        }}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
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
            name="description"
            placeholder="Description"
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

        <Box sx={{ ml: 1 }}>
          <input
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => handleUploadImage(e.target.files[0])}
          />
          {previewImage && (
            <img src={previewImage} alt="preview" width="auto" height="200" />
          )}
        </Box>

        <Box sx={{ "& button": { m: 1 } }}>
          <Button
            variant="contained"
            size="small"
            type="submit"
            color="success"
          >
            <AddCircleOutlineIcon />
            Add
          </Button>
          <Button variant="contained" size="small" onClick={hideAddItemForm}>
            <HighlightOffIcon />
            Cancel
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};
export default AdminForm;
