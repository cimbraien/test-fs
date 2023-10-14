import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";

const ProductDetailModal = ({ open, product, onClose }) => {
  const {
    name,
    categoryName,
    imageUrl,
    description,
    sku,
    weight,
    length,
    height,
    price,
  } = product || {};
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          alt="Product Image"
          height="300"
          image={imageUrl}
        />
        <Typography variant="h6">Name: {name}</Typography>
        <Typography variant="h6">Description: {description}</Typography>
        <Typography variant="h6" color="primary">
          Price: {price}
        </Typography>
        <Typography variant="body1">SKU: {sku}</Typography>
        <Typography variant="body1">Weight: {weight}</Typography>
        <Typography variant="body1">Length: {length}</Typography>
        <Typography variant="body1">Height: {height}</Typography>
        <Typography variant="body2">Category: {categoryName}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
