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
  const [selectedLeaderboard, setSelectedLeadeboard] = useState('AI');
  const [monthQuery, setMonthQuery] = useState('ALL');
  const [yearQuery, setYearQuery] = useState('ALL');
  const [leaderboards, setLeaderboards] = useState(null);



  // ambe data dummy
  useEffect(() => {
    setLeaderboards(null);

    (async () => {
      let URI = '';
      if (selectedLeaderboard === 'AI') URI = 'https://dummyjson.com/users?limit=50&skip=25';
      if (selectedLeaderboard === 'TeamPVE') URI = 'https://dummyjson.com/users?limit=75&skip=50';
      if (selectedLeaderboard === 'TeamPVP') URI = 'https://dummyjson.com/users?limit=100&skip=75';

      const req = await fetch(URI);
      const res = await req.json();
      if (res) {
        setLeaderboards(res.users.map(leaderboard => ({
          username: leaderboard.username,
          KDratio: leaderboard.weight,
          score: leaderboard.height,
          date: leaderboard.birthDate,
          duration: leaderboard.age
        })));
      }
    })();
  }, [selectedLeaderboard]);



  function filteredLeaderboads() {
    return leaderboards?.filter(leaderboard => (
      ((monthQuery === 'ALL') || leaderboard.date.split('T')[0].split('-')[1].includes(monthQuery)) &&
      ((yearQuery === 'ALL') || leaderboard.date.split('T')[0].split('-')[0].includes(yearQuery))
    ));
  }

  function resetOnClick() {

  }



  return (
    <main>
      <div className='-mt-4 -mx-4 bg-tertiary flex px-4'>
        <div className={`${selectedLeaderboard === 'AI' ? 'bg-secondary' : ''} py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`} onClick={() => setSelectedLeadeboard('AI')}>AI</div>
        <div className={`${selectedLeaderboard === 'TeamPVE' ? 'bg-secondary' : ''} py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`} onClick={() => setSelectedLeadeboard('TeamPVE')}>Team PVE</div>
        <div className={`${selectedLeaderboard === 'TeamPVP' ? 'bg-secondary' : ''} py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`} onClick={() => setSelectedLeadeboard('TeamPVP')}>Team PVP</div>
      </div>
      
      <div className='mt-4 text-2xl'>LEADERBOARD</div>

      <div className='mt-4 overflow-auto'>
        {!leaderboards ? (
          <div className='text-center text-lg'>Loading data ...</div>
        ) : (leaderboards.length === 0) ? (
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
                  value={monthQuery}
                  onChange={e => setMonthQuery(e.target.value)}
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
                  value={yearQuery}
                  onChange={e => setYearQuery(e.target.value)}
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
                value={yearQuery}
                onChange={e => setYearQuery(e.target.value)}
              />
              {/* pake input -----> */}
            </div>

            <table className='mt-4 w-full select-text'>
              <thead className='bg-tertiary text-neutral-100 border border-tertiary'>
                <tr>
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
                    <td className='px-2 border-x border-tertiary'>{leaderboard.username}</td>
                    <td className='px-2 border-x border-tertiary'>{leaderboard.KDratio}</td>
                    <td className='px-2 border-x border-tertiary'>{leaderboard.score}</td>
                    <td className='px-2 border-x border-tertiary'>{leaderboard.date}</td>
                    <td className='px-2 border-x border-tertiary'>{leaderboard.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='mt-4 flex justify-end'>
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
      </div>
    </main>
  );
};
