import { Snackbar, Alert } from '@mui/material';

export const CustomAlert = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};