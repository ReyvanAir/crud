import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { ref, set } from "firebase/database";
import { auth, database } from "../../configs/firebase";

export default function AddUserDialog({ open, onClose }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleCreateUser = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await set(ref(database, "User/" + user.uid), {
        username: userName,
        email: email,
      });
    } catch (error) {}
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User</DialogTitle>

      <DialogContent>
        <form
          // onSubmit={handleCreateUser}
          className="my-4 flex flex-col gap-4"
        >
          <TextField
            label="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isFormSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreateUser}
          // disabled={isFormInvalid || isFormSubmitting}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
