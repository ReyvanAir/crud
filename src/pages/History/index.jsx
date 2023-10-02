import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { useState, useEffect } from 'react';

import HistoryDialog from './HistoryDialog';



export default function History() {
  const [filterMonth, setFilterMonth] = useState('ALL');
  const [filterDuration, setFilterDuration] = useState('default');
  const [histories, setHistories] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);



  // ambe data dummy
  useEffect(() => {
    (async () => {
      const req = await fetch('https://dummyjson.com/user?limit=50');
      const res = await req.json();
      if (res) {
        setHistories(res.users.map(history => ({
          battle: history.maidenName,
          result: history.eyeColor,
          date: history.birthDate,
          duration: history.age,

          username: history.username,
          kill: history.ip.split('.')[0],
          death: history.ip.split('.')[1],
          score: history.height
        })));
      }
    })();
  }, []);



  function filteredHistories() {
    return histories?.filter(history => (
      ((filterMonth === 'ALL') || history.date.split('T')[0].split('-')[1].includes(filterMonth))
    )).sort((a, b) => (filterDuration === 'fastest') ? a.duration-b.duration : (filterDuration === 'slowest') ? b.duration-a.duration : 0);
  }



  return (
    <main>
      <div className='text-2xl'>HISTORY</div>

      <div className='mt-4 overflow-auto'>
        {!histories ? (
          <div className='text-center text-lg'>Loading data ...</div>
        ) : (histories.length === 0) ? (
          <div className='text-center text-lg'>Data is empty</div>
        ) : (
          <>
            <div className='mt-2 flex items-center gap-4'>
              <label className='text-lg'>Leaderboard On:</label>

              <FormControl>
                <InputLabel>Month</InputLabel>
                <Select
                  label='Month'
                  variant='outlined'
                  size='small'
                  value={filterMonth}
                  onChange={e => setFilterMonth(e.target.value)}
                >
                  <MenuItem value='ALL'>ALL</MenuItem>
                  <MenuItem value='01'>January</MenuItem>
                  <MenuItem value='02'>February</MenuItem>
                  <MenuItem value='03'>March</MenuItem>
                  <MenuItem value='04'>April</MenuItem>
                  <MenuItem value='05'>May</MenuItem>
                  <MenuItem value='06'>June</MenuItem>
                  <MenuItem value='07'>July</MenuItem>
                  <MenuItem value='08'>August</MenuItem>
                  <MenuItem value='09'>September</MenuItem>
                  <MenuItem value='10'>October</MenuItem>
                  <MenuItem value='11'>November</MenuItem>
                  <MenuItem value='12'>December</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl>
                <InputLabel>Duration</InputLabel>
                <Select
                  label='Duration'
                  variant='outlined'
                  size='small'
                  value={filterDuration}
                  onChange={e => setFilterDuration(e.target.value)}
                >
                  <MenuItem value='default'>Default</MenuItem>
                  <MenuItem value='fastest'>Fastest</MenuItem>
                  <MenuItem value='slowest'>Slowest</MenuItem>
                </Select>
              </FormControl>
            </div>

            <table className='mt-4 w-full select-text'>
              <thead className='bg-tertiary text-neutral-100 border border-tertiary'>
                <tr>
                  <th className='py-2 px-2'>BATTLE</th>
                  <th className='py-2 px-2'>RESULT</th>
                  <th className='py-2 px-2'>DATE</th>
                  <th className='py-2 px-2'>DURATION</th>
                </tr>
              </thead>
              <tbody className='border border-tertiary' style={{backgroundColor: '#FDF3D3'}}>
                {filteredHistories().map((history, index) => (
                  <tr
                    key={index}
                    className='hover:cursor-pointer hover:bg-secondary'
                    onClick={() => setSelectedHistory(history)}
                  >
                    <td className='px-2 border-y border-tertiary'>{history.battle}</td>
                    <td className='px-2 border-y border-tertiary'>{history.result}</td>
                    <td className='px-2 border-y border-tertiary'>{history.date}</td>
                    <td className='px-2 border-y border-tertiary'>{history.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>



      {/* Selected History Dialog */}
      {selectedHistory && (
        <HistoryDialog
          open={selectedHistory ? true : false}
          onClose={() => setSelectedHistory(null)}
          data={histories}
        />
      )}
    </main>
  );
};
