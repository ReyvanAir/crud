import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import { database } from "../../configs/firebase";
import { get, ref } from "firebase/database";

export default function Leaderboard() {
  const [selectedMode, setSelectedMode] = useState("AI");
  const [filterMonth, setFilterMonth] = useState("ALL");
  const [filterYear, setFilterYear] = useState("ALL");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState(null);
  const [battleHist, setBattleHist] = useState([]);

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

  const calculateKDRatio = (uid) => {
    const userBattles = battleHist.filter((battle) => {
      // Check if the user participated in the battle
      if (battle.team1 && battle.team1.players && battle.team1.players[uid]) {
        return true;
      }
      if (battle.team2 && battle.team2.players && battle.team2.players[uid]) {
        return true;
      }
      return false;
    });

    // Initialize variables to count kills and deaths
    let totalKills = 0;
    let totalDeaths = 0;

    userBattles.forEach((battle) => {
      // Check if the user is in team1
      if (battle.team1 && battle.team1.players && battle.team1.players[uid]) {
        totalKills += battle.team1.players[uid].kill || 0;
        totalDeaths += battle.team1.players[uid].death || 0;
      }
      // Check if the user is in team2
      if (battle.team2 && battle.team2.players && battle.team2.players[uid]) {
        totalKills += battle.team2.players[uid].kill || 0;
        totalDeaths += battle.team2.players[uid].death || 0;
      }
    });

    // Avoid division by zero
    if (totalDeaths === 0) {
      return "Infinity"; // Handle cases where there are no deaths
    }

    // Calculate K/D ratio
    const kdratio = totalKills / totalDeaths;

    console.log("K/D Ratio:", kdratio);

    return kdratio.toFixed(2); // Return with 2 decimal places
  };

  // Calculate Score
  const calculateScore = (uid) => {
    const userBattles = battleHist.filter((battle) => {
      // Check if the user participated in the battle
      if (battle.team1 && battle.team1.players && battle.team1.players[uid]) {
        return true;
      }
      if (battle.team2 && battle.team2.players && battle.team2.players[uid]) {
        return true;
      }
      return false;
    });

    // Initialize variables to score
    let totalScore = 0;

    userBattles.forEach((battle) => {
      // Check if the user is in team1
      if (battle.team1 && battle.team1.players && battle.team1.players[uid]) {
        totalScore += battle.team1.players[uid].score || 0;
      }
      // Check if the user is in team2
      if (battle.team2 && battle.team2.players && battle.team2.players[uid]) {
        totalScore += battle.team2.players[uid].score || 0;
      }
    });

    console.log("score:", totalScore);

    return totalScore.toFixed(2); // Return with 2 decimal places
  };
  // Calculate W/L
  const calculateWLRatio = (uid) => {
    console.log("battle history", battleHist);
    const wins = battleHist.filter((battle) => {
      if (battle.mode === "PVP") {
        return (
          Object.keys(battle.team1.players).includes(uid) ||
          Object.keys(battle.team2.players).includes(uid)
        );
      }
      if (battle.mode === "PVE" || battle.mode === "AI") {
        return Object.keys(battle.team1.players).includes(uid);
      }
    });
    const battlesWon = wins.filter((battle) => {
      if (battle.team1.players[uid]) {
        return battle.team1.winlose === "win";
      }
      if (battle.team2.players[uid]) {
        return battle.team2.winlose === "win";
      }
    });
    // RUMUS W/L Ratio
    console.log("battles won", battlesWon);
    console.log("wins", wins);
    const winRatio = (battlesWon.length / wins.length) * 100;
    console.log("win ratio", winRatio.toFixed(2));
    return winRatio.toFixed(2);
  };

  //useEffect User/Battle
  useEffect(() => {
    getAllUser();
    getAllBattle();
  }, []);

  //useEffect W/L
  useEffect(() => {
    if (battleHist && users) {
      users.map((user) => {
        user.WLratio = calculateWLRatio(user.uid);
      });
      // calculateWLRatio("Gidkdwidlgibcfis");
    }
    setUsers(users);
  }, [battleHist, users]);

  //useEffect K/D
  useEffect(() => {
    if (battleHist && users) {
      users.map((user) => {
        user.KDratio = calculateKDRatio(user.uid);
      });
      // calculateWLRatio("Gidkdwidlgibcfis");
    }
    setUsers(users);
  }, [battleHist, users]);

  //useEffect Score
  useEffect(() => {
    if (battleHist && users) {
      users.map((user) => {
        user.score = calculateScore(user.uid);
      });
      // calculateWLRatio("Gidkdwidlgibcfis");
    }
    setUsers(users);
  }, [battleHist, users]);

  function resetOnClick() {}

  console.log(users);
  console.log(battleHist);
  return (
    <main className="flex-1 flex flex-col gap-4 p-4">
      <div className="text-2xl">LEADERBOARD</div>

      {!users ? (
        <div className="text-center text-lg">Loading data ...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-lg">Data is empty</div>
      ) : (
        <>
          <div className="flex gap-4 items-center"></div>
          <div className="flex-1 overflow-auto">
            <Table className="w-full">
              <TableHead className="bg-tertiary text-neutral-100 border border-tertiary">
                <TableRow>
                  <TableCell className="py-2 px-2">RANK</TableCell>
                  <TableCell className="py-2 px-2">USERNAME</TableCell>
                  <TableCell className="py-2 px-2">K/D Ratio</TableCell>
                  <TableCell className="py-2 px-2">W/L Ratio</TableCell>
                  <TableCell className="py-2 px-2">SCORE</TableCell>
                </TableRow>
              </TableHead>
              <tbody
                className="border border-tertiary"
                style={{ backgroundColor: "#FDF3D3" }}
              >
                {users
                  ?.sort((a, b) => b.score - a.score)
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((leaderboard, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-2 border-y border-tertiary">
                        {index + 1 + page * 10}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {leaderboard.userName}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {leaderboard.KDratio}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {leaderboard.WLratio}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {leaderboard.score}
                      </TableCell>
                    </TableRow>
                  ))}
              </tbody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[20, 10, 30]}
              component={"div"}
              count={users?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="contained" onClick={resetOnClick} color="error">
              Reset
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
