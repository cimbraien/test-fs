import React from "react";
import { Button } from "@mui/material";

interface CreateCategoryButtonProps {
  onClick: () => void;
}

const CreateCategoryButton: React.FC<CreateCategoryButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      style={{ margin: "0 8px 0 0" }}>
      Add Product Category
    </Button>
  );
};

export default CreateCategoryButton;
