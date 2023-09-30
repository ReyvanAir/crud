import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { auth, database } from "../config/firebase";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [data, setData] = useState(null);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const userRef = ref(database, "/users");

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const cleaned = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setData(cleaned);
    });
  }, []);
  return (
    <div className="flex flex-1 h-[100vh] flex-row gap-20 bg-white">
      <div className="h-[100vh] w-[50vh] bg-orange-100 py-[42px] px-[30px] shadow-xl">
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>
            {user.displayName}
          </h1>
        </div>
        <div>
          <p style={{ textAlign: "center" }} class="text-yellow-600">
            USER
          </p>
          {/* Display user information here */}
        </div>
        <button
          className="absolute inset-x-10 bottom-10 pl-2 w-[40vh] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg items-center"
          onClick={() => {
            // Handle user actions (e.g., logout)
            signOut(auth).then(() => navigate("/login"));
          }}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-2 flex-col w-[100vh] pt-20 gap-10 ">
        <div className="flex flex-row gap-5">
          <div
            className="h-[20vh] w-[30vh] bg-orange-200 rounded-xl shadow-xl"
            onClick={() => navigate("/user")}
          >
            <p>USER</p>
          </div>
          <div
            className="h-[20vh] w-[30vh] bg-orange-200 rounded-xl shadow-xl"
            onClick={() => navigate("/score")}
          >
            <p>Score Board</p>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Kill</TableCell>
              <TableCell>Death</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.sort((a, b) => b.kills - a.kills)
              .map((item) => (
                <TableRow>
                  {/* <TableCell>{item.username}</TableCell>
                  <TableCell>{item.kills}</TableCell>
                  <TableCell>{item.deaths}</TableCell>
                  <TableCell>{item.xp}</TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default User;
