export default function MatchHistoryItem({
  mode,
  kill,
  death,
  score,
  result
}) {
  return (
    <div className='bg-tertiary rounded p-2 text-neutral-100'>
      <div className='grid grid-cols-4 font-bold'>
        <div>Mode</div>
        <div>K/D</div>
        <div>Score</div>
        <div>Result</div>
      </div>
      <div className='grid grid-cols-4'>
        <div>{mode}</div>
        <div>{kill}/{death}</div>
        <div>{score}</div>
        <div>{result}</div>
      </div>
    </div>
  );
};
