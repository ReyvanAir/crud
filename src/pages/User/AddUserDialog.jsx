import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions
} from '@mui/material';
import { useState, useEffect } from 'react';



export default function AddUserDialog({open, onClose}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);



  useEffect(() => {
    if (
      !userName ||
      !email ||
      !password
    ) setIsFormInvalid(true);
    else setIsFormInvalid(false);
  }, [userName, email, password]);



  function handleSubmit(e) {
    e.preventDefault();
    setIsFormSubmitting(true);

    setTimeout(() => {
      setIsFormSubmitting(false);
      onClose();
    }, 1000);
  }



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User</DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit} className='my-4 flex flex-col gap-4'>
          <TextField
            label='UserName'
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />

          <TextField
            label='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='email'
            required
          />

          <TextField
            label='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            required
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isFormSubmitting}>Cancel</Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={isFormInvalid || isFormSubmitting}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
