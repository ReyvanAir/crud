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

  // ambe data dummy
  // useEffect(() => {
  //   setLeaderboards(null);

  //   (async () => {
  //     let URI = "";
  //     if (selectedMode === "AI")
  //       URI = "https://dummyjson.com/users?limit=50&skip=25";
  //     if (selectedMode === "TeamPVE")
  //       URI = "https://dummyjson.com/users?limit=75&skip=50";
  //     if (selectedMode === "TeamPVP")
  //       URI = "https://dummyjson.com/users?limit=100&skip=75";

  //     const req = await fetch(URI);
  //     const res = await req.json();
  //     if (res) {
  //       setLeaderboards(
  //         res.users.map((leaderboard) => ({
  //           rank: leaderboard.id,
  //           username: leaderboard.username,
  //           KDratio: leaderboard.weight,
  //           score: leaderboard.height,
  //           gameDate: leaderboard.birthDate,
  //           duration: leaderboard.age,
  //         }))
  //       );
  //     }
  //   })();
  // }, [selectedMode]);

  // function filteredUsers() {
  //   return users?.filter((user) => !user || user.userName.includes(filterUser));
  // }

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

  // function filteredLeaderboads() {
  //   return leaderboards?.filter(
  //     (leaderboard) =>
  //       (filterMonth === "ALL" ||
  //         leaderboard.gameDate.split("T")[0].split("-")[1].includes(filterMonth)) &&
  //       (filterYear === "ALL" ||
  //         leaderboard.gameDate.split("T")[0].split("-")[0].includes(filterYear))
  //   );
  // }
  // function filteredLeaderboads() {
  //   return users?.filter(
  //     (leaderboard) =>
  //       (filterMonth === "ALL" ||
  //         leaderboard.gameDate.split("T")[0].split("-")[1].includes(filterMonth)) &&
  //       (filterYear === "ALL" ||
  //         leaderboard.gameDate.split("T")[0].split("-")[0].includes(filterYear))
  //   );
  // }

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

  // useEffect(() => {
  //   if (battleHist && users) {
  //     const updatedUsers = users.map((user) => ({
  //       ...user,
  //       KDratio: calculateKDRatio(user.uid),
  //     }));
  //     setUsers(updatedUsers);
  //   }
  // }, [battleHist, users]);

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
      <div className="-mt-4 -mx-4 bg-tertiary flex px-4">
        <div
          className={`${
            selectedMode === "AI" ? "bg-secondary" : ""
          } py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`}
          onClick={() => setSelectedMode("AI")}
        >
          AI
        </div>
        <div
          className={`${
            selectedMode === "TeamPVE" ? "bg-secondary" : ""
          } py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`}
          onClick={() => setSelectedMode("TeamPVE")}
        >
          Team PVE
        </div>
        <div
          className={`${
            selectedMode === "TeamPVP" ? "bg-secondary" : ""
          } py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`}
          onClick={() => setSelectedMode("TeamPVP")}
        >
          Team PVP
        </div>
      </div>

      <div className="text-2xl">LEADERBOARD</div>

      {!users ? (
        <div className="text-center text-lg">Loading data ...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-lg">Data is empty</div>
      ) : (
        <>
          <div className="flex gap-4 items-center">
            <div className="text-lg">Leaderboard On:</div>

            <FormControl>
              <InputLabel>Month</InputLabel>
              <Select
                label="Month"
                variant="outlined"
                size="small"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              >
                <MenuItem value="ALL">ALL</MenuItem>
                <MenuItem value="01">January</MenuItem>
                <MenuItem value="02">February</MenuItem>
                <MenuItem value="03">March</MenuItem>
                <MenuItem value="04">April</MenuItem>
                <MenuItem value="05">May</MenuItem>
                <MenuItem value="06">June</MenuItem>
                <MenuItem value="07">July</MenuItem>
                <MenuItem value="08">August</MenuItem>
                <MenuItem value="09">September</MenuItem>
                <MenuItem value="10">October</MenuItem>
                <MenuItem value="11">November</MenuItem>
                <MenuItem value="12">December</MenuItem>
              </Select>
            </FormControl>

            {/* <----- pake select */}
            <FormControl>
              <InputLabel>Year</InputLabel>
              <Select
                label="Year"
                variant="outlined"
                size="small"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <MenuItem value="ALL">ALL</MenuItem>
                {/* {users.map((leaderboard, index) => (
                  <MenuItem
                    key={index}
                    value={leaderboard.gameDate.split("T")[0].split("-")[0]}
                  >
                    {leaderboard.gameDate.split("T")[0].split("-")[0]}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
            {/* pake select -----> */}

            {/* <----- pake input */}
            <TextField
              label="Year"
              variant="outlined"
              size="small"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            />
            {/* pake input -----> */}
          </div>

          <div className="flex-1 overflow-auto">
            <Table className="w-full">
              <TableHead className="bg-tertiary text-neutral-100 border border-tertiary">
                <TableRow>
                  <TableCell className="py-2 px-2">RANK</TableCell>
                  <TableCell className="py-2 px-2">USERNAME</TableCell>
                  <TableCell className="py-2 px-2">K/D Ratio</TableCell>
                  <TableCell className="py-2 px-2">SCORE</TableCell>
                  <TableCell className="py-2 px-2">DATE</TableCell>
                  <TableCell className="py-2 px-2">DURATION</TableCell>
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
                        {leaderboard.score}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {leaderboard.gameDate}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {leaderboard.duration}
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
