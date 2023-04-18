import TravelLogsForm from '@/components/TravelLogsForm';

const Add = () => {
  return (
    <div className="w-full overflow-auto p-6">
      <TravelLogsForm
        onComplete={() => {
          console.log('added');
        }}
      />
    </div>
  );
};
export default Add;
