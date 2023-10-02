export default function Card({
  title,
  value,
  details=null
}) {
  console.log(value, typeof(value));
  return (
    <div className='bg-tertiary rounded text-neutral-100 p-2 flex flex-col justify-between'>
      <div>
        <div className='text-lg'>{title}</div>
        <div className='mt-2 text-4xl'>{value}</div>
      </div>

      {details && (
        <div className='mt-8'>
          {details.map((detail, index) => (
            <div key={index} className='text-sm flex justify-between'>
              <label>{detail[0]}</label>
              <label>{detail[1]}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
