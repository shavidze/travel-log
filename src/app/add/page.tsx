import TravelLogsForm from '@/components/TravelLogsForm';

const Add = () => {
  return (
    <div className="w-full overflow-auto p-6">
      <TravelLogsForm
        onComplete={() => {
          console.log('added');
        }}
        onCancel={() => {
          console.error('aqs');
        }}
      />
    </div>
  );
};
export default Add;
