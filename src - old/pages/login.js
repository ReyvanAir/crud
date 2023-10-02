import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate, useNavigation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleAuth = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        navigate("/user");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  // console.log("from password", password);

  return (
    <div className="flex flex-1 h-[100vh] flex-col items-center justify-center bg-gradient-to-tr from-[#FEAF00] to-[#F8D442]">
      <div className="flex flex-col h-[70vh] w-[60vh] bg-white py-[42px] px-[30px] rounded-xl shadow-xl">
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            AIRFORCE SIMULATION COMMAND
          </h1>
        </div>
        <div sytle={{ textAlign: "center" }} className="self-center pt-5">
          <h1 style={{ fontWeight: "bold", fontSize: "1rem" }}>SIGN IN</h1>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
            onClick={handleAuth}
          >
            Sign In
          </button>
        </form>
        <div sytle={{ textAlign: "center" }} className="self-center pt-5">
          <p>Don't have an account? Sign up</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
