import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";

import HistoryDialog from "./HistoryDialog";
import { database } from "../../configs/firebase";
import { get, ref } from "firebase/database";

export default function History() {
  const [filterMonth, setFilterMonth] = useState("ALL");
  const [filterDuration, setFilterDuration] = useState("default");
  const [histories, setHistories] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [battle, setBattle] = useState(null);

  // ambe data dummy
  // useEffect(() => {
  //   (async () => {
  //     const req = await fetch("https://dummyjson.com/user?limit=50");
  //     const res = await req.json();
  //     if (res) {
  //       setHistories(
  //         res.users.map((history) => ({
  //           battle: history.maidenName,
  //           result: history.eyeColor,
  //           gameDate: history.birthDate,
  //           duration: history.age,

  //           username: history.username,
  //           kill: history.ip.split(".")[0],
  //           death: history.ip.split(".")[1],
  //           score: history.height,
  //         }))
  //       );
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    getAllBattle();
  }, []);

  useEffect(() => {
    const getAllBattle = async () => {
      const battleRef = ref(database, "BattleHistory");
      try {
        const res = await get(battleRef);
        const battles = Object.keys(res.val()).map((key) => {
          const battleData = res.val()[key];
          const battleResult = battleData.team1.winlose; // Assuming "result" is stored in the "winlose" field of team1
          return {
            battleId: key,
            ...battleData,
            result: battleResult,
          };
        });
        setBattle(battles);
      } catch (error) {
        console.log("ERROR: ", error);
      }
    };

    getAllBattle();
  }, []);

  function filteredHistories() {
    return battle
      ?.filter(
        (history) =>
          filterMonth === "ALL" ||
          history.gameDate?.split("T")[0].split("-")[1].includes(filterMonth)
      )
      .sort((a, b) =>
        filterDuration === "fastest"
          ? a.duration - b.duration
          : filterDuration === "slowest"
          ? b.duration - a.duration
          : 0
      );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllBattle = async () => {
    const battleRef = ref(database, "BattleHistory");
    try {
      const res = await get(battleRef);
      const battles = Object.keys(res.val()).map((key) => ({
        battleId: key,
        ...res.val()[key],
      }));
      setBattle(battles);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const parsedData = () => {
    let users;

    if (selectedHistory && selectedHistory.mode === "PVP") {
      const team1 = Object.keys(selectedHistory?.team1?.players).map((key) => ({
        ...selectedHistory.team1.players[key],
      }));
      const team2 = Object.keys(selectedHistory?.team2?.players).map((key) => ({
        ...selectedHistory.team2.players[key],
      }));

      users = [...team1, ...team2];
    } else if (
      selectedHistory &&
      (selectedHistory.mode === "PVE" || selectedHistory.mode === "AI")
    ) {
      const team1 = Object.keys(selectedHistory?.team1?.players).map((key) => ({
        ...selectedHistory.team1.players[key],
      }));
      users = team1;
    } else {
      users = [];
    }

    return users;
  };

  return (
    <main className="flex-1 flex flex-col gap-4 p-4">
      <div className="text-2xl">HISTORY</div>

      {!battle ? (
        <div className="text-center text-lg">Loading data ...</div>
      ) : battle.length === 0 ? (
        <div className="text-center text-lg">Data is empty</div>
      ) : (
        <>
          <div className="flex gap-4 items-center">
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

            <FormControl>
              <InputLabel>Duration</InputLabel>
              <Select
                label="Duration"
                variant="outlined"
                size="small"
                value={filterDuration}
                onChange={(e) => setFilterDuration(e.target.value)}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="fastest">Fastest</MenuItem>
                <MenuItem value="slowest">Slowest</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex-1 overflow-auto">
            <Table className="w-full">
              <TableHead className="bg-tertiary text-neutral-100 border border-tertiary">
                <TableRow>
                  <TableCell className="py-2 px-2">MODE</TableCell>
                  <TableCell className="py-2 px-2">RESULT</TableCell>
                  <TableCell className="py-2 px-2">DATE</TableCell>
                  <TableCell className="py-2 px-2">DURATION</TableCell>
                </TableRow>
              </TableHead>
              <tbody
                className="border border-tertiary"
                style={{ backgroundColor: "#FDF3D3" }}
              >
                {filteredHistories()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((history, index) => (
                    <TableRow
                      key={index}
                      className="hover:cursor-pointer hover:bg-secondary"
                      onClick={() => setSelectedHistory(history)}
                    >
                      <TableCell className="px-2 border-y border-tertiary">
                        {history.mode}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {history.result}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {history.gameDate}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {history.duration}
                      </TableCell>
                    </TableRow>
                  ))}
              </tbody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[20, 10, 30]}
              component={"div"}
              count={filteredHistories().length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </>
      )}

      {/* Selected History Dialog */}
      {selectedHistory && (
        <HistoryDialog
          open={selectedHistory ? true : false}
          onClose={() => setSelectedHistory(null)}
          data={parsedData()}
        />
      )}
    </main>
  );
}
