export default function CardWrapper({ title, children }) {
  return (
    <div className='p-4 rounded bg-secondary'>
      <div className='text-lg font-bold'>{title}</div>
      <div className='mt-4 grid grid-cols-3 gap-4'>
        {children}
      </div>
    </div>
  );
};
