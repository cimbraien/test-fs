import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { FormControl, Input, InputLabel, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { postCategory } from "../../redux/httpSlice";

export const CreateCategoryForm = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");

  const handleButton = async () => {
    try {

      dispatch(postCategory(name));
      onClose();
    } catch (error) {}
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h2>Create Product Category</h2>
        <form>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
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
