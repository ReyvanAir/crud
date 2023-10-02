import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions
} from '@mui/material';
import { useState } from 'react';



export default function DeleteUserDialog({open, onClose}) {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);



  function handleSubmit() {
    setIsFormSubmitting(true);

    setTimeout(() => {
      setIsFormSubmitting(false);
      onClose();
    }, 1000);
  }



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>

      <DialogContent>
        <DialogContentText>Are you sure want to delete?</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isFormSubmitting}>No</Button>
        <Button
          variant='contained'
          color='error'
          onClick={handleSubmit}
          disabled={isFormSubmitting}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
