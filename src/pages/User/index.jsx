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

export default function User() {
  const navigate = useNavigate();

  const [filterUser, setFilterUser] = useState("");
  const [users, setUsers] = useState(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ambe data dummy
  useEffect(() => {
    (async () => {
      const req = await fetch("https://dummyjson.com/users?limit=50");
      const res = await req.json();
      if (res) {
        setUsers(
          res.users.map((user) => ({
            UID: user.id,
            userName: user.username,
            email: user.email,
            battle: user.maidenName,
            score: user.height,
            WLratio: user.weight,
          }))
        );
      }
    })();
  }, []);

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
                  <TableCell className="py-2 px-2">K/D Ratio</TableCell>
                  <TableCell className="py-2 px-2">W/L Ratio</TableCell>
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
                    <TableRow
                    // key={index}
                    // className="hover:cursor-pointer hover:bg-secondary"
                    // onClick={() => navigate(`/user/detail/${user.UID}`)}
                    >
                      <TableCell className="px-2 border-y border-tertiary  ">
                        {user.UID}
                      </TableCell>
                      <TableCell
                        key={index}
                        className="px-2 border-y border-tertiary 
                      hover:cursor-pointer hover:bg-secondary"
                        onClick={() => navigate(`/user/detail/${user.UID}`)}
                      >
                        {user.userName}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {user.email}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {user.KDratio}
                      </TableCell>
                      <TableCell className="px-2 border-y border-tertiary">
                        {user.WLratio}
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
