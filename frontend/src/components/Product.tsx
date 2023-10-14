import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import { ProductDto } from "../dtos/product.dto";

const Product = (product: Partial<ProductDto>) => {
  return (
    <Card style={{ height: '100%' }}>	
      <CardMedia
				className="product-card"
        component="img"
        height="200"
        image={product.imageUrl}
      />
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Name: {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Description: {product.description}
        </Typography>
        <Typography variant="h5" color="primary">
          Price: {product.price}
        </Typography>
        <Typography variant="overline">
          Category: {product.categoryName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
