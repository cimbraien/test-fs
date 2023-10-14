import { ChangeEvent, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import {
  FormControl,
  Input,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { API_URL } from "../../configs/app.config";
import { postProduct } from "../../redux/httpSlice";
import { CreateProductDto } from "../../dtos/product.dto";

export const CreateProductForm = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<File[]>([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [weight, setWeight] = useState(0);
  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);
  const [price, setPrice] = useState(0);

  const handleButton = async () => {
    try {
      const dto: CreateProductDto = {
        name,
        description,
        sku,
        price,
        weight,
        length,
        height,
        categoryId: category,
        image: image[0],
      };
      dispatch(postProduct(dto));
      onClose();
    } catch (error) {}
  };

  const loadCategories = async () => {
    const response = await fetch(`${API_URL}/product/category`);
    const data = await response.json();
    setCategories(data.result);
  };

  useEffect(() => {
    if (open) {
      loadCategories();
    }
  }, [open]);

  const handleImageChange = e => {
    const selectedImage = e.target.files[0];
    if (!selectedImage || !selectedImage.type.startsWith("image/")) return;

    setImage([selectedImage]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h2>Create Product</h2>
        <form>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel></InputLabel>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="image">
              <Button
                variant="contained"
                component="span"
                style={{ margin: "8px 8px" }}>
                Browse
              </Button>
            </label>
            <Input
              type="file"
              id="image"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            {image && image.length > 0 ? (
              <img
                src={URL.createObjectURL(image[0])}
                alt="Selected Image"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            ) : (
              <div
                style={{
                  border: "1px dashed #ccc",
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                No Image Selected
              </div>
            )}
          </FormControl>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel>Product Category</InputLabel>
            <Select
              labelId="category"
              value={category}
              label="Age"
              onChange={e => setCategory(e.target.value)}
              style={{ margin: "8px 0" }}>
              {categories.map((category: { id: string; name: string }) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel>Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel>Description</InputLabel>
            <Input
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel>SKU</InputLabel>
            <Input
              id="sku"
              value={sku}
              onChange={e => setSku(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel>Weight</InputLabel>
            <Input
              id="weight"
              value={weight}
              onChange={e => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setWeight(value);
                }
              }}
            />
          </FormControl>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel>Length</InputLabel>
            <Input
              id="length"
              value={length}
              onChange={e => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setLength(value);
                }
              }}
            />
          </FormControl>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel>Height</InputLabel>
            <Input
              id="height"
              value={height}
              onChange={e => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setHeight(value);
                }
              }}
            />
          </FormControl>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel>Price</InputLabel>
            <Input
              id="price"
              value={price}
              onChange={e => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setPrice(value);
                }
              }}
            />
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleButton}>
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
