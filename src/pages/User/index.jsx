import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

import CardWrapper from './CardWrapper';
import Card from './Card';
import MatchHistoryItem from './MatchHistoryItem';



export default function User() {
  const [selectedMode, setSelectedMode] = useState('AI');
  const [data, setData] = useState(null);



  // ambe data dummy
  useEffect(() => {
    (async () => {
      const req = await fetch('https://dummyjson.com/users/1');
      const res = await req.json();
      if (res) {
        setData({
          AI: {
            simulationPlayed: parseInt(res.phone.split(' ')[1]),
            kill: parseInt(res.birthDate.split('-')[0].slice(0, 2)),
            death: parseInt(res.birthDate.split('-')[0].slice(3, 5)),
            win: parseInt(res.birthDate.split('-')[1]),
            lose: parseInt(res.birthDate.split('-')[2])
          },
          teamPVE: {
            simulationPlayed: parseInt(res.phone.split(' ')[2]),
            kill: parseInt(res.ip.split('.')[0]),
            death: parseInt(res.ip.split('.')[1]),
            win: parseInt(res.ip.split('.')[2]),
            lose: parseInt(res.ip.split('.')[3])
          },
          teamPVP: {
            simulationPlayed: parseInt(res.phone.split(' ')[3]),
            kill: parseInt(res.address.postalCode.slice(0, 2)),
            death: parseInt(res.address.postalCode.slice(1, 3)),
            win: parseInt(res.address.postalCode.slice(2, 4)),
            lose: parseInt(res.address.postalCode.slice(3, 5))
          }
        });
      }
    })();
  }, []);



  function viewAllMatchesOnClick() {

  }



  return (
    <main>
      <div className='-mt-4 -mx-4 bg-tertiary flex px-4'>
        <div className={`${selectedMode === 'AI' ? 'bg-secondary' : ''} py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`} onClick={() => setSelectedMode('AI')}>AI</div>
        <div className={`${selectedMode === 'TeamPVE' ? 'bg-secondary' : ''} py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`} onClick={() => setSelectedMode('TeamPVE')}>Team PVE</div>
        <div className={`${selectedMode === 'TeamPVP' ? 'bg-secondary' : ''} py-2 px-8 text-neutral-100 rounded hover:bg-secondary hover:cursor-pointer`} onClick={() => setSelectedMode('TeamPVP')}>Team PVP</div>
      </div>

      <div className='mt-4 h-full overflow-auto'>
        {!data ? (
          <div className='text-center text-lg'>Loading data ...</div>
        ) : (
          <div className='h-full grid grid-cols-3 gap-8'>
            <div className='col-span-2 flex flex-col gap-4'>
              <CardWrapper title='OVERVIEW'>
                <Card
                  title='Simulation Played'
                  value={data.AI.simulationPlayed + data.teamPVE.simulationPlayed + data.teamPVP.simulationPlayed}
                  details={[
                    ['AI', data.AI.simulationPlayed],
                    ['PVE', data.teamPVE.simulationPlayed],
                    ['PVP', data.teamPVP.simulationPlayed]
                  ]}
                />
                <Card
                  title='Kill/Death'
                  value={((data.AI.kill + data.teamPVE.kill + data.teamPVP.kill) / (data.AI.death + data.teamPVE.death + data.teamPVP.death)).toFixed(2)}
                  details={[
                    ['Kills', data.AI.kill + data.teamPVE.kill + data.teamPVP.kill],
                    ['Deaths', data.AI.death + data.teamPVE.death + data.teamPVP.death]
                  ]}
                />
                <Card
                  title='Win/Lose'
                  value={((data.AI.win + data.teamPVE.win + data.teamPVP.win) / (data.AI.lose + data.teamPVE.lose + data.teamPVP.lose)).toFixed(2)}
                  details={[
                    ['WIN', data.AI.win + data.teamPVE.win + data.teamPVP.win],
                    ['LOSE', data.AI.lose + data.teamPVE.lose + data.teamPVP.lose]
                  ]}
                />
              </CardWrapper>

              {(selectedMode === 'AI') ? (
                <CardWrapper title='AI OVERVIEW'>
                  <Card
                    title='Simulation Played'
                    value={data.AI.simulationPlayed}
                  />
                  <Card
                    title='Kill/Death'
                    value={(data.AI.kill / data.AI.death).toFixed(2)}
                    details={[
                      ['Kills', data.AI.kill],
                      ['Deaths', data.AI.death]
                    ]}
                  />
                  <Card
                    title='Win/Lose'
                    value={(data.AI.win / data.AI.lose).toFixed(2)}
                    details={[
                      ['WIN', data.AI.win],
                      ['LOSE', data.AI.lose]
                    ]}
                  />
                </CardWrapper>
              ) : (selectedMode === 'TeamPVE') ? (
                <CardWrapper title='PVE OVERVIEW'>
                  <Card
                    title='Simulation Played'
                    value={data.teamPVE.simulationPlayed}
                  />
                  <Card
                    title='Kill/Death'
                    value={(data.teamPVE.kill / data.teamPVE.death).toFixed(2)}
                    details={[
                      ['Kills', data.teamPVE.kill],
                      ['Deaths', data.teamPVE.death]
                    ]}
                  />
                  <Card
                    title='Win/Lose'
                    value={(data.teamPVE.win / data.teamPVE.lose).toFixed(2)}
                    details={[
                      ['WIN', data.teamPVE.win],
                      ['LOSE', data.teamPVE.lose]
                    ]}
                  />
                </CardWrapper>
              ) : (selectedMode === 'TeamPVP') && (
                <CardWrapper title='PVP OVERVIEW'>
                  <Card
                    title='Simulation Played'
                    value={data.teamPVP.simulationPlayed}
                  />
                  <Card
                    title='Kill/Death'
                    value={(data.teamPVP.kill / data.teamPVP.death).toFixed(2)}
                    details={[
                      ['Kills', data.teamPVP.kill],
                      ['Deaths', data.teamPVP.death]
                    ]}
                  />
                  <Card
                    title='Win/Lose'
                    value={(data.teamPVP.win / data.teamPVP.lose).toFixed(2)}
                    details={[
                      ['WIN', data.teamPVP.win],
                      ['LOSE', data.teamPVP.lose]
                    ]}
                  />
                </CardWrapper>
              )}
            </div>

            <div className='bg-secondary border rounded border-tertiary p-2 flex flex-col gap-8'>
              <div className='flex justify-between'>
                <div className='text-lg font-bold'>MATCH HISTORY</div>
                <Button
                  variant='contained'
                  size='small'
                  onClick={viewAllMatchesOnClick}
                >
                  View All Matches
                </Button>
              </div>
              
              <div className='flex flex-col gap-2'>
                <div className='font-bold'>TODAY</div>
                <MatchHistoryItem
                  mode='PVP'
                  kill={13}
                  death={10}
                  score='8-10'
                  result='LOST'
                />
                <MatchHistoryItem
                  mode='PVE'
                  kill={13}
                  death={10}
                  score='12-10'
                  result='WIN'
                />
                <MatchHistoryItem
                  mode='AI'
                  kill={13}
                  death={10}
                  score='8-10'
                  result='WIN'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <div className='font-bold'>YESTERDAY</div>
                <MatchHistoryItem
                  mode='PVP'
                  kill={13}
                  death={10}
                  score='8-10'
                  result='LOST'
                />
                <MatchHistoryItem
                  mode='PVE'
                  kill={13}
                  death={10}
                  score='12-10'
                  result='WIN'
                />
                <MatchHistoryItem
                  mode='AI'
                  kill={13}
                  death={10}
                  score='8-10'
                  result='WIN'
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
