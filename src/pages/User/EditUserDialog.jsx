import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions
} from '@mui/material';
import { useState, useEffect } from 'react';



export default function EditUserDialog({open, onClose, data}) {
  const [userName, setUserName] = useState(data.userName);
  const [email, setEmail] = useState(data.email);
  const [score, setScore] = useState(data.score);
  const [battle, setBattle] = useState(data.battle);
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);



  useEffect(() => {
    if (
      !userName ||
      !email ||
      !score ||
      !battle
    ) setIsFormInvalid(true);
    else setIsFormInvalid(false);
  }, [userName, email, score, battle]);



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
      <DialogTitle>Edit User</DialogTitle>

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
            label='Score'
            value={score}
            onChange={e => setScore(e.target.value)}
            required
          />

          <TextField
            label='Battle'
            value={battle}
            onChange={e => setBattle(e.target.value)}
            required
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isFormSubmitting}>Cancel</Button>
        <Button
          variant='contained'
          color='warning'
          onClick={handleSubmit}
          disabled={isFormInvalid || isFormSubmitting}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
