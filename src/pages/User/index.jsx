import { Delete, Edit } from "@mui/icons-material";
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AddUserDialog from "./AddUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import EditUserDialog from "./EditUserDialog";
import { database } from "../../configs/firebase";
import { get, ref } from "firebase/database";

export default function User() {
  const navigate = useNavigate();

  const [filterUser, setFilterUser] = useState("");
  const [users, setUsers] = useState(null);
  const [battleHist, setBattleHist] = useState([]);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function filteredUsers() {
    return users?.filter((user) => !user || user.userName.includes(filterUser));
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllUser = async () => {
    const usersRef = ref(database, "User");
    try {
      const res = await get(usersRef);
      const users = Object.keys(res.val()).map((key) => ({
        uid: key,
        userName: res.val()[key].username,
        email: res.val()[key].email,
      }));
      setUsers(users);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const getAllBattle = async () => {
    const battleRef = ref(database, "BattleHistory");
    try {
      const res = await get(battleRef);
      const battles = Object.keys(res.val()).map((key) => ({
        battleId: key,
        ...res.val()[key],
      }));
      setBattleHist(battles);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const calculateWLRatio = (uid) => {
    const wins = battleHist.filter((battle) => {
      if (battle.mode === "PVP") {
        return (
          Object.keys(battle?.team1?.players).includes(uid) ||
          Object.keys(battle?.team2?.players).includes(uid)
        );
      }
      if (battle.mode === "PVE" || battle.mode === "AI") {
        return Object.keys(battle?.team1?.players).includes(uid);
      }
    });
    const battlesWon = wins.filter((battle) => {
      if (battle?.team1?.players[uid]) {
        return battle.team1.winlose === "win";
      }
      if (battle?.team2?.players[uid]) {
        return battle?.team2.winlose === "win";
      }
    });
    // RUMUS W/L Ratio
    const winRatio = (battlesWon.length / wins.length) * 100;
    return winRatio.toFixed(1);
  };

  const calculateKDRatio = (uid) => {
    const userBattles = battleHist.filter((battle) => {
      // Check if the user participated in the battle
      if (
        battle?.team1 &&
        battle?.team1?.players &&
        battle?.team1?.players[uid]
      ) {
        return true;
      }
      if (
        battle?.team2 &&
        battle?.team2?.players &&
        battle?.team2?.players[uid]
      ) {
        return true;
      }
      return false;
    });

    // Initialize variables to count kills and deaths
    let totalKills = 0;
    let totalDeaths = 0;

    userBattles.forEach((battle) => {
      // Check if the user is in team1
      if (
        battle.team1 &&
        battle?.team1?.players &&
        battle.team1?.players[uid]
      ) {
        totalKills += battle?.team1?.players[uid]?.kill || 0;
        totalDeaths += battle?.team1?.players[uid]?.death || 0;
      }
      // Check if the user is in team2
      if (
        battle.team2 &&
        battle?.team2?.players &&
        battle.team2?.players[uid]
      ) {
        totalKills += battle?.team2?.players[uid]?.kill || 0;
        totalDeaths += battle?.team2?.players[uid]?.death || 0;
      }
    });

    // Avoid division by zero
    if (totalDeaths === 0) {
      return "Infinity"; // Handle cases where there are no deaths
    }

    // Calculate K/D ratio
    const kdratio = totalKills / totalDeaths;

    return kdratio.toFixed(1); // Return with 2 decimal places
  };

  useEffect(() => {
    getAllUser();
    getAllBattle();
  }, []);

  useEffect(() => {
    if (battleHist && users) {
      users.map((user) => {
        user.WLratio = calculateWLRatio(user.uid);
      });
      // calculateWLRatio("Gidkdwidlgibcfis");
    }
  }, [battleHist, users]);

  useEffect(() => {
    if (battleHist && users) {
      const updatedUsers = users.map((user) => ({
        ...user,
        KDratio: calculateKDRatio(user.uid),
      }));
      setUsers(updatedUsers);
    }
  }, [battleHist, users]);

  return (
    <main className="flex-1 flex flex-col gap-4 p-4">
      <div className="text-2xl">USER</div>
      {!users ? (
        <div className="text-center text-lg">Loading data ...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-lg">Data is empty</div>
      ) : (
        <>
          <div className="flex gap-4 items-center">
            <TextField
              label="Search User"
              variant="outlined"
              size="small"
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-auto">
            <Table className="w-full">
              <TableHead className="bg-tertiary text-neutral-100 border border-tertiary">
                <TableRow>
                  <TableCell className="py-2 px-2">UID</TableCell>
                  <TableCell className="py-2 px-2">UserName</TableCell>
                  <TableCell className="py-2 px-2">Email</TableCell>
                  <TableCell className="py-2 px-2">Action</TableCell>
                </TableRow>
              </TableHead>
              <tbody
                className="border border-tertiary"
                style={{ backgroundColor: "#FDF3D3" }}
              >
                {filteredUsers()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <TableRow>
                      <TableCell className="px-2 border-y border-tertiary  ">
                        {user.uid}
                      </TableCell>
                      <TableCell
                        key={index}
                        className="px-2 border-y border-tertiary 
                      hover:cursor-pointer hover:bg-secondary"
                        onClick={() => navigate("/user/detail/${user.UID}")}
                      >
                        {user.userName}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {user.email}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary text-center">
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => setIsDeleteUserDialogOpen(user)}
                        >
                          <Delete color="error" />
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => setIsEditUserDialogOpen(user)}
                        >
                          <Edit color="warning" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </tbody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[20, 10, 30]}
              component={"div"}
              count={filteredUsers().length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="contained"
              onClick={() => setIsAddUserDialogOpen(true)}
            >
              Add User
            </Button>
          </div>
        </>
      )}
      {/* Add User Dialog */}
      {isAddUserDialogOpen && (
        <AddUserDialog
          open={isAddUserDialogOpen ? true : false}
          onClose={() => setIsAddUserDialogOpen(false)}
        />
      )}
      {/* Delete User Dialog */}
      {isDeleteUserDialogOpen && (
        <DeleteUserDialog
          open={isDeleteUserDialogOpen ? true : false}
          onClose={() => setIsDeleteUserDialogOpen(false)}
          data={isDeleteUserDialogOpen}
        />
      )}
      {/* Edit User Dialog */}
      {isEditUserDialogOpen && (
        <EditUserDialog
          open={isEditUserDialogOpen ? true : false}
          onClose={() => setIsEditUserDialogOpen(false)}
          data={isEditUserDialogOpen}
        />
      )}
    </main>
  );
}
