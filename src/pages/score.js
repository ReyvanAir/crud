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
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    // Function to handle search input changes
    setSearchText(e.target.value);
  };

  const filteredData = data?.filter((item) =>
    item.username.toLowerCase().includes(searchText.toLowerCase())
  );

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
    <div className="flex h-[100vh] bg-white">
      {/* side navbar*/}
      <div className="h-[100vh] w-[38vh] bg-orange-100 py-[42px] px-[30px] shadow-xl">
        {/* Profile Picture */}
        {/* <div className="text-center mt-4">
          <img
            src=""
            alt="Profile Picture"
            className="rounded-full w-20 h-20 mx-auto"
          />
        </div> */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>
            {user.displayName}
          </h1>
        </div>
        <div>
          <p style={{ textAlign: "center" }} className="text-yellow-600">
            USER
          </p>
          {/* Display user information here */}
        </div>
        <button
          className="absolute inset-x-10 bottom-10 pl-2 w-[30vh] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg items-center"
          onClick={() => {
            // Handle user actions (e.g., logout)
            signOut(auth).then(() => navigate("/login"));
          }}
        >
          Logout
        </button>

        {/* Navigation Bar (Menu) */}
        <div className="flex flex-col items-center justify-center h-full mt-[-40px] mb-10">
          <button
            className="bg-orange-200 hover:bg-orange-300 text-white font-bold py-2 px-20 rounded"
            onClick={() => navigate("/user")}
          >
            User
          </button>
          <button
            className="bg-orange-200 hover:bg-orange-300 text-white font-bold py-2 px-20 rounded mt-5"
            onClick={() => navigate("/score")}
          >
            Scoreboard
          </button>
          <button
            className="bg-orange-200 hover:bg-orange-300 text-white font-bold py-2 px-20 rounded mt-5"
            onClick={() => navigate("/history")}
          >
            History
          </button>
        </div>
      </div>
      {/* side navbar end*/}

      <div className="flex flex-2 flex-col w-[165vh] ">
        {/* Tab */}
        <div class="flex space-x-4 bg-gray-300 ">
          <button class="w-1/3 bg-gray-300 hover:bg-gray-700 text-black py-2 px-4 rounded-lg">
            AI
          </button>
          <button class="w-1/3 bg-gray-300 hover:bg-gray-700 text-black py-2 px-4 rounded-lg">
            TEAM PVE
          </button>
          <button class="w-1/3 bg-gray-300 hover:bg-gray-700 text-black py-2 px-4 rounded-lg">
            TEAM PVP
          </button>
        </div>

        <div className="pl-10 mt-10 pr-10">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>UID</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Battle</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>W/L Ratio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.sort((a, b) => b.kills - a.kills)
                .map((item) => (
                  <TableRow>
                    <TableCell>{}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{}</TableCell>
                    <TableCell>{}</TableCell>
                    <TableCell>{item.xp}</TableCell>
                    <TableCell>{}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div class="relative flex flex-row justify-end items-end h-10 mt-5 space-x-10 pr-10">
          <div class="bg-red-400 hover:bg-red-500 w-40 h-10 rounded flex items-center justify-center">
            RESET
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
