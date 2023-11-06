import { TextField, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { auth, database } from "../../configs/firebase";
import { get, ref } from "firebase/database";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsFormSubmitting(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const adminRef = ref(database, "/Admin");
      if (res) {
        const payload = {
          user: res.user,
          role: "ADMIN",
        };
        await get(adminRef).then((snapshot) => {
          const adminList = Object.keys(snapshot.val());
          console.log(adminList);
          if (adminList.includes(res.user.uid)) {
            setIsFormSubmitting(false);
            sessionStorage.setItem("user", JSON.stringify(payload));
            window.location.reload();
          } else throw new Error("Invalid Account");
        });
      }
    } catch (err) {
      setIsFormSubmitting(false);

      if (err?.code?.includes("auth/invalid-email"))
        setErrorMessage("Email tidak valid.");
      else if (err?.code?.includes("auth/user-not-found"))
        setErrorMessage("User tidak ditemukan.");
      else if (err?.code?.includes("auth/wrong-password"))
        setErrorMessage("Password salah.");
      else if (err?.message.includes("Invalid Account")) {
        setErrorMessage("Invalid User");
      }
    }
  }

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <div className="bg-primary border-2 border-secondary p-16">
        <div className="text-3xl text-center">Simulation Data</div>

        <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-4">
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          <div className="text-center text-red-500">{errorMessage}</div>

          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="w-full"
              type="submit"
              disabled={isFormSubmitting}
            >
              Sign In
            </Button>

            <Button
              variant="text"
              size="small"
              className="w-full"
              onClick={() => navigate("/sign-up")}
              disabled={isFormSubmitting}
            >
              Don't have account? Sign up
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
