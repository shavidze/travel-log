import TravelLogsForm from '@/app/components/TravelLogsForm';

const Add = () => {
  return (
    <div className="w-full overflow-auto p-6">
      <TravelLogsForm
        onComplete={() => {
          throw new Error('Function not implemented.');
        }}
        onCancel={() => {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default Add;
