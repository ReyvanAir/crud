import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import { useState, useEffect } from 'react';



export default function Leaderboard() {
  const [selectedMode, setSelectedMode] = useState('AI');
  const [filterMonth, setFilterMonth] = useState('ALL');
  const [filterYear, setFilterYear] = useState('ALL');
  const [leaderboards, setLeaderboards] = useState(null);



  // ambe data dummy
  useEffect(() => {
    setLeaderboards(null);

    (async () => {
      let URI = '';
      if (selectedMode === 'AI') URI = 'https://dummyjson.com/users?limit=50&skip=25';
      if (selectedMode === 'TeamPVE') URI = 'https://dummyjson.com/users?limit=75&skip=50';
      if (selectedMode === 'TeamPVP') URI = 'https://dummyjson.com/users?limit=100&skip=75';

      const req = await fetch(URI);
      const res = await req.json();
      if (res) {
        setLeaderboards(res.users.map(leaderboard => ({
          rank: leaderboard.id,
          username: leaderboard.username,
          KDratio: leaderboard.weight,
          score: leaderboard.height,
          date: leaderboard.birthDate,
          duration: leaderboard.age
        })));
      }
    })();
  }, [selectedMode]);



  function filteredLeaderboads() {
    return leaderboards?.filter(leaderboard => (
      ((filterMonth === 'ALL') || leaderboard.date.split('T')[0].split('-')[1].includes(filterMonth)) &&
      ((filterYear === 'ALL') || leaderboard.date.split('T')[0].split('-')[0].includes(filterYear))
    ));
  }

  function resetOnClick() {

  }



  return (
    <main className='flex-1 flex flex-col gap-4 p-4'>
      <div className='-mt-4 -mx-4 bg-tertiary flex px-4'>
        <div className={`${selectedMode === 'AI' ? 'bg-secondary' : ''} py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`} onClick={() => setSelectedMode('AI')}>AI</div>
        <div className={`${selectedMode === 'TeamPVE' ? 'bg-secondary' : ''} py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`} onClick={() => setSelectedMode('TeamPVE')}>Team PVE</div>
        <div className={`${selectedMode === 'TeamPVP' ? 'bg-secondary' : ''} py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`} onClick={() => setSelectedMode('TeamPVP')}>Team PVP</div>
      </div>

      <div className='text-2xl'>LEADERBOARD</div>
      
      {!leaderboards ? (
        <div className='text-center text-lg'>Loading data ...</div>
      ) : (leaderboards.length === 0) ? (
        <div className='text-center text-lg'>Data is empty</div>
      ) : (
        <>
          <div className='flex gap-4 items-center'>
            <div className='text-lg'>Leaderboard On:</div>

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
              
              {/* <----- pake select */}
              <FormControl>
                <InputLabel>Year</InputLabel>
                <Select
                  label='Year'
                  variant='outlined'
                  size='small'
                  value={filterYear}
                  onChange={e => setFilterYear(e.target.value)}
                >
                  <MenuItem value='ALL'>ALL</MenuItem>
                  {leaderboards.map((leaderboard, index) => (
                    <MenuItem key={index} value={leaderboard.date.split('T')[0].split('-')[0]}>{leaderboard.date.split('T')[0].split('-')[0]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* pake select -----> */}

              {/* <----- pake input */}
              <TextField
                label='Year'
                variant='outlined'
                size='small'
                value={filterYear}
                onChange={e => setFilterYear(e.target.value)}
              />
              {/* pake input -----> */}
          </div>

          <div className='flex-1 overflow-auto'>
            <table className='w-full'>
              <thead className='bg-tertiary text-neutral-100 border border-tertiary'>
                <tr>
                  <th className='py-2 px-2'>RANK</th>
                  <th className='py-2 px-2'>USERNAME</th>
                  <th className='py-2 px-2'>K/D Ratio</th>
                  <th className='py-2 px-2'>SCORE</th>
                  <th className='py-2 px-2'>DATE</th>
                  <th className='py-2 px-2'>DURATION</th>
                </tr>
              </thead>
              <tbody className='border border-tertiary' style={{backgroundColor: '#FDF3D3'}}>
                {filteredLeaderboads().map((leaderboard, index) => (
                  <tr key={index}>
                    <td className='px-2 border-y border-tertiary'>{leaderboard.rank}</td>
                    <td className='px-2 border-y border-tertiary'>{leaderboard.username}</td>
                    <td className='px-2 border-y border-tertiary'>{leaderboard.KDratio}</td>
                    <td className='px-2 border-y border-tertiary'>{leaderboard.score}</td>
                    <td className='px-2 border-y border-tertiary'>{leaderboard.date}</td>
                    <td className='px-2 border-y border-tertiary'>{leaderboard.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='flex justify-end gap-4'>
            <Button
              variant='contained'
              onClick={resetOnClick}
              color='error'
            >
              Reset
            </Button>
          </div>
        </>
      )}
    </main>
  );
};
