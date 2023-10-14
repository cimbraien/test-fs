import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { FormControl, Input, InputLabel, TextField } from "@mui/material";
import { login } from "../redux/authAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export const LoginForm = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const credentials = { email, password };

    try {
      dispatch(login(credentials));
      onClose();
    } catch (error) {}
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h2>Login</h2>
        <form>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth style={{ margin: "8px 0" }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
