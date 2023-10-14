import React from "react";
import { Button } from "@mui/material";

interface CreateProductButtonProps {
  onClick: () => void;
}

const CreateProductButton: React.FC<CreateProductButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      style={{ margin: "0 8px 0 0" }}>
      Add Product
    </Button>
  );
};

export default CreateProductButton;
