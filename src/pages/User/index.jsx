import { Delete, Edit } from '@mui/icons-material';
import { TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AddUserDialog from './AddUserDialog';
import DeleteUserDialog from './DeleteUserDialog';
import EditUserDialog from './EditUserDialog';



export default function User() {
  const navigate = useNavigate();

  const [filterUser, setFilterUser] = useState('');
  const [users, setUsers] = useState(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);



  // ambe data dummy
  useEffect(() => {
    (async () => {
      const req = await fetch('https://dummyjson.com/users?limit=50');
      const res = await req.json();
      if (res) {
        setUsers(res.users.map(user => ({
          UID: user.id,
          userName: user.username,
          email: user.email,
          battle: user.maidenName,
          score: user.height,
          WLratio: user.weight
        })));
      }
    })();
  }, []);



  function filteredUsers() {
    return users?.filter(user => (
      (!user || user.userName.includes(filterUser))
    ));
  }



  return (
    <main className='flex-1 flex flex-col gap-4 p-4'>
      <div className='text-2xl'>USER</div>
      
      {!users ? (
        <div className='text-center text-lg'>Loading data ...</div>
      ) : (users.length === 0) ? (
        <div className='text-center text-lg'>Data is empty</div>
      ) : (
        <>
          <div className='flex gap-4 items-center'>
            <TextField
              label='Search User'
              variant='outlined'
              size='small'
              value={filterUser}
              onChange={e => setFilterUser(e.target.value)}
            />
          </div>

          <div className='flex-1 overflow-auto'>
            <table className='w-full'>
              <thead className='bg-tertiary text-neutral-100 border border-tertiary'>
                <tr>
                  <th className='py-2 px-2'>UID</th>
                  <th className='py-2 px-2'>UserName</th>
                  <th className='py-2 px-2'>Email</th>
                  <th className='py-2 px-2'>Battle</th>
                  <th className='py-2 px-2'>SCORE</th>
                  <th className='py-2 px-2'>W/L Ratio</th>
                  <th className='py-2 px-2'>Action</th>
                </tr>
              </thead>
              <tbody className='border border-tertiary' style={{backgroundColor: '#FDF3D3'}}>
                {filteredUsers().map((user, index) => (
                  <tr
                    key={index}
                    className='hover:cursor-pointer hover:bg-secondary'
                    onClick={() => navigate(`/user/detail/${user.UID}`)}
                  >
                    <td className='px-2 border-y border-tertiary'>{user.UID}</td>
                    <td className='px-2 border-y border-tertiary'>{user.userName}</td>
                    <td className='px-2 border-y border-tertiary'>{user.email}</td>
                    <td className='px-2 border-y border-tertiary'>{user.battle}</td>
                    <td className='px-2 border-y border-tertiary'>{user.score}</td>
                    <td className='px-2 border-y border-tertiary'>{user.WLratio}</td>
                    <td className='px-2 border-y border-tertiary text-center'>
                      <Button
                        variant='text'
                        size='small'
                        onClick={() => setIsDeleteUserDialogOpen(user)}
                      >
                        <Delete color='error' />
                      </Button>
                      <Button
                        variant='text'
                        size='small'
                        onClick={() => setIsEditUserDialogOpen(user)}
                      >
                        <Edit color='warning' />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='flex justify-end gap-4'>
            <Button variant='contained' onClick={() => setIsAddUserDialogOpen(true)}>
              Add User
            </Button>
          </div>
        </>
      )}



      {/* Add User Dialog */}
      {isAddUserDialogOpen && (
        <AddUserDialog open={isAddUserDialogOpen ? true : false} onClose={() => setIsAddUserDialogOpen(false)} />
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
};
